import { z } from 'zod';

export const RegisterSchema = z.object({
  fullname: z.string().min(1, {
    message: 'fullname is required!',
  }),
  email: z.string().email({
    message: 'email is required!',
  }),
  password: z.string().min(6, {
    message: 'password must be at least 6 characters!',
  }),
  confirmPassword: z.string().min(6, {
    message: 'confirm password must be at least 6 characters!',
  }),
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
