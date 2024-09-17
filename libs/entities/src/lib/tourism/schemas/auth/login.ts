import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'email is required!',
  }),
  password: z.string().min(6, {
    message: 'password must be at least 6 characters!',
  }),
});
export type TLoginSchema = z.infer<typeof LoginSchema>;
