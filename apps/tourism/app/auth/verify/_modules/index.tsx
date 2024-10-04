'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyOtp } from '@pkm/libs/actions/tourism';
import { Alert, ControlledTextField, FormAuth } from '@pkm/ui';
import Link from 'next/link';
import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useForgotPasswordContext } from '../../forgot-password/_modules/context';

const verifyOtpSchema = z.object({
  otp: z.string().regex(/^[0-9]+$/, 'Kode Otp hanya berisi angka!'),
});

export type TVerifyOtpSchema = z.infer<typeof verifyOtpSchema>;
export const VerifyModule: FC = (): ReactElement => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TVerifyOtpSchema>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: '',
    },
    mode: 'all',
  });
  const [isSuccess, setIsSuccess] = useState(isSubmitSuccessful);
  const [message, setMessage] = useState('');
  const { data } = useForgotPasswordContext();

  const onSubmit = async (value: TVerifyOtpSchema) => {
    try {
      if (!data) {
        router.push('/auth/login');
        return;
      }
      if (data.isForgotPassword) {
        const res = await verifyOtp(data?.email as string, value.otp);
        if (res.message) {
          setMessage(res.message);
          setIsSuccess(true);
          router.push('/auth/reset-password');
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
      onSubmit={handleSubmit(onSubmit)}
      buttonName="Kirim"
      title="Verifikasi Otp"
      subtitle="Check Pesan email anda, kami telah kirimkan kode otp ke email anda."
      buttonLoading={isSubmitting}
    >
      <div className="flex flex-col gap-2">
        <ControlledTextField
          placeholder="Masukan Otp"
          name="otp"
          control={control}
          errorMessage={errors.otp?.message}
          variant={
            errors.otp ? 'error' : isSubmitSuccessful ? 'success' : 'default'
          }
        />
        <Link href="/auth/forgot-password" className="text-xs text-neutral-60%">
          kirim ulang otp?
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
