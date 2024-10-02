import { z } from 'zod';

export const LoginSchemaMarket = z.object({
  email: z.string({ required_error: 'email harus diisi!' }).email({
    message: 'email harus valid!',
  }),
  password: z.string({ required_error: 'password harus diisi!' }).min(6, {
    message: 'password must be at least 6 characters!',
  }),
});

export type TLoginSchemaMarket = z.infer<typeof LoginSchemaMarket>;

export const RegisterSchemaMarket = z.object({
  fullname: z.string({ required_error: 'Nama lengkap harus diisi!' }).min(1, {
    message: 'Nama lengkap harus diisi!',
  }),
  email: z.string({ required_error: 'email harus diisi!' }).email({
    message: 'email harus valid!',
  }),
  password: z.string({ required_error: 'password harus diisi!' }).min(6, {
    message: 'password minimal 6 karakter!',
  }),
  confirmPassword: z
    .string({ required_error: 'password harus diisi!' })
    .min(6, {
      message: 'konfirmasi password minimal 6 karakter!',
    }),
});

export type TRegisterSchemaMarket = z.infer<typeof RegisterSchemaMarket>;
