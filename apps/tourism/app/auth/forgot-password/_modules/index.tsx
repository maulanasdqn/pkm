'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendOtp } from '@pkm/libs/actions/tourism';
import { Alert, ControlledTextField, FormAuth } from '@pkm/ui';
import Link from 'next/link';
import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useForgotPasswordContext } from './context';
import { useRouter } from 'next/navigation';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email tidak valid' }),
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export const ForgotPasswordModule: FC = (): ReactElement => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'all',
  });
  const [isSuccess, setIsSuccess] = useState(isSubmitSuccessful);
  const [message, setMessage] = useState('');
  const { setData } = useForgotPasswordContext();

  const onSubmit = async (data: TForgotPasswordSchema) => {
    try {
      const res = await sendOtp(data.email);
      if (res.message) {
        setMessage(res.message);
        setData({ email: data.email, isForgotPassword: true });
        setIsSuccess(true);
        router.push('/auth/verify');
      }
    } catch (error) {
      console.error(error);
      setError('root', {
        type: 'alert',
        message: `${error}`,
      });
    }
  };

  return (
    <FormAuth
      onSubmit={handleSubmit(onSubmit)}
      buttonName="Kirim"
      title="Lupa Password?"
      subtitle="Jangan khawatir! Cukup masukkan email Anda, dan kami akan membantu Anda."
      buttonLoading={isSubmitting}
    >
      <div className="flex flex-col gap-2">
        <ControlledTextField
          placeholder="Masukan Email"
          name="email"
          control={control}
          errorMessage={errors.email?.message}
          variant={
            errors.email ? 'error' : isSubmitSuccessful ? 'success' : 'default'
          }
        />
        <Link href="/auth/forgot-password" className="text-xs text-neutral-60%">
          kirim ulang email?
        </Link>
      </div>
      <Alert
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        message={message}
        variant="success"
        timer={3000}
      />
      <Alert
        show={errors.root?.type === 'alert' ? true : false}
        onHide={() =>
          setError('root', {
            type: '',
            message: '',
          })
        }
        message={errors.root?.message as string}
        variant="error"
        timer={3000}
      />
    </FormAuth>
  );
};
