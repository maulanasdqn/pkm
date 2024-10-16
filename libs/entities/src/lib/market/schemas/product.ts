import { z } from 'zod';

export const CreateProductMarket = z.object({
  name: z.string({ required_error: 'name harus diisi!' }).min(1, {
    message: 'name harus diisi!',
  }),
  description: z.string({ required_error: 'deskripsi harus diisi!' }).min(1, {
    message: 'deskripsi harus diisi!',
  }),
  image: z
    .any()
    .refine((file) => file, {
      message: 'image harus diisi!',
    })
    .optional(),
  price: z.string({ required_error: 'price harus diisi!' }).min(1, {
    message: 'price harus diisi!',
  }),
  stock: z.string({ required_error: 'stock harus diisi!' }).min(1, {
    message: 'stok harus diisi!',
  }),
  categoryId: z.string({ required_error: 'kategori harus diisi!' }).min(1, {
    message: 'kategori harus diisi!',
  }),
});

export type TCreateProductMarket = z.infer<typeof CreateProductMarket>;
