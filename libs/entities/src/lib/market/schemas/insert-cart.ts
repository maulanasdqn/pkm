import { z } from 'zod';

export const InsertCartSchemaMarket = z.object({
  userId: z.string().min(1, {
    message: 'user id harus diisi',
  }),
  productId: z.string().min(1, {
    message: 'product id harus diisi',
  }),
  quantity: z.number().min(1, {
    message: 'quantity harus diisi',
  }),
});

export type InsertCartMarket = z.infer<typeof InsertCartSchemaMarket>;
