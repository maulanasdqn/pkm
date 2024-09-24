import { z } from 'zod';

export const metaResponseSchema = z.object({
  page: z.number().optional(),
  perPage: z.number().optional(),
  totalPage: z.number().optional(),
  total: z.number().optional(),
  prevPage: z.number().optional().nullable(),
  nextPage: z.number().optional().nullable(),
});

export const queryParamsSchema = z
  .object({
    id: z.string().optional(),
    search: z.string().optional(),
  })
  .extend(metaResponseSchema.pick({ page: true, perPage: true }).shape)
  .optional();

export type TQueryParams = z.infer<typeof queryParamsSchema>;
export type TMetaResponse = z.infer<typeof metaResponseSchema>;
