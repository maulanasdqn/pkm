import { z } from 'zod';

export const ProfileSchemaMarket = z.object({
  fullname: z.string().min(1, {
    message: 'nama lengkap harus diisi',
  }),
  email: z.string().email({
    message: 'email harus diisi',
  }),
  phoneNumber: z
    .string()
    .min(8, {
      message: 'no telepon minimal 8 angka',
    })
    .max(13, {
      message: 'no telepon maksimal 13 angka',
    }),
  image: z.string().optional(),
  address: z.string().min(1, {
    message: 'alamat harus diisi',
  }),
  gender: z.custom<'male' | 'female'>().nullable().optional(),
});

export type TProfileMarket = z.infer<typeof ProfileSchemaMarket>;
