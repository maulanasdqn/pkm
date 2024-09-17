import { z } from 'zod';

export const destinationSchema = z.object({
  id: z.string(),
  name: z.string({ required_error: 'name is required!' }).min(1, {
    message: 'Nama harus lebih dari 1 karakter',
  }),
  description: z.string({ required_error: 'description is required!' }).min(1, {
    message: 'Deskripsi harus lebih dari 1 karakter',
  }),
  images: z.string().array(),
  ticketPrice: z.coerce.number().min(0).int().nonnegative(),
  status: z.enum(['active', 'inactive'], {
    message: 'Pilih status destinasi!',
  }),
});

export const createDestinationSchema = z.object({
  name: destinationSchema.shape.name,
  description: destinationSchema.shape.description,
  images: destinationSchema.shape.images,
  ticketPrice: destinationSchema.shape.ticketPrice,
  status: destinationSchema.shape.status,
});

export const updateDestinationSchema = z.object({
  id: destinationSchema.shape.id,
  name: destinationSchema.shape.name,
  description: destinationSchema.shape.description,
  images: destinationSchema.shape.images,
  ticketPrice: destinationSchema.shape.ticketPrice,
  status: destinationSchema.shape.status,
});

export type TCreateDestinationSchema = z.infer<typeof createDestinationSchema>;
export type TUpdateDestinationSchema = z.infer<typeof updateDestinationSchema>;
export type TDestinationSchema = z.infer<typeof destinationSchema>;
