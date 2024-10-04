'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormAuth, ControlledTextField, Alert } from '@pkm/ui';
import { useRouter } from 'next/navigation';
import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useForgotPasswordContext } from '../../forgot-password/_modules/context';
import { resetPassword } from '@pkm/libs/actions/tourism';

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: 'password must be at least 6 characters!',
    }),
    confirmPassword: z.string().min(6, {
      message: 'confirm password must be at least 6 characters!',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Konfirmasi kata sandi tidak cocok!',
  });

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export const ResetPasswordModule: FC = (): ReactElement => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });
  const [isSuccess, setIsSuccess] = useState(isSubmitSuccessful);
  const [message, setMessage] = useState('');
  const { data, setData } = useForgotPasswordContext();

  const onSubmit = async (value: TResetPasswordSchema) => {
    try {
      if (!data) {
        router.push('/auth/login');
        return;
      }
      if (data.isForgotPassword) {
        const res = await resetPassword(data?.email as string, value.password);
        if (res.message) {
          setMessage(res.message);
          setIsSuccess(true);
          setData({ email: '', isForgotPassword: false });
          router.push('/auth/login');
        }
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
      buttonName="Simpan"
      title="Ubah Password"
      subtitle="Sekarang anda dapat mengubah password dengan yang baru."
      onSubmit={handleSubmit(onSubmit)}
      buttonLoading={isSubmitting}
    >
      <ControlledTextField
        type="password"
        placeholder="Buat password"
        name="password"
        errorMessage={errors.password?.message}
        variant={
          errors.password || errors.root
            ? 'error'
            : isSubmitSuccessful
            ? 'success'
            : 'default'
        }
        control={control}
      />
      <ControlledTextField
        type="password"
        placeholder="Ulangi password"
        name="confirmPassword"
        errorMessage={errors.confirmPassword?.message}
        variant={
          errors.confirmPassword || errors.root
            ? 'error'
            : isSubmitSuccessful
            ? 'success'
            : 'default'
        }
        control={control}
      />
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
