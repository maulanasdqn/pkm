import { z } from 'zod';

export const informationSchema = z.object({
  id: z.string(),
  title: z.string({ required_error: 'title is required!' }).min(1, {
    message: 'title must be at least 1 characters',
  }),
  description: z.string({ required_error: 'description is required!' }).min(1, {
    message: 'description must be at least 1 characters',
  }),
  location: z.string({ required_error: 'location is required!' }).min(1, {
    message: 'location must be at least 1 characters',
  }),
  image: z.string({ required_error: 'image is required!' }),
  createdAt: z.date().nullable(),
});

export const createInformationSchema = z.object({
  title: informationSchema.shape.title,
  description: informationSchema.shape.description,
  location: informationSchema.shape.location,
  image: informationSchema.shape.image,
});

export const updateInformationSchema = z.object({
  id: informationSchema.shape.id,
  title: informationSchema.shape.title,
  description: informationSchema.shape.description,
  location: informationSchema.shape.location,
  image: informationSchema.shape.image,
});

export type TInformationSchema = z.infer<typeof informationSchema>;
export type TCreateInformationSchema = z.infer<typeof createInformationSchema>;
export type TUpdateInformationSchema = z.infer<typeof updateInformationSchema>;
