import { z } from 'zod';

export const createMessageSchema = z.object({
  sender: z.string({ required_error: 'nama harus diisi!' }).min(1, {
    message: 'nama harus diisi!',
  }),
  message: z.string({ required_error: 'pesan harus diisi!' }).min(1, {
    message: 'pesan harus diisi!',
  }),
  email: z.string({ required_error: 'email is required!' }).min(1, {
    message: 'email must be at least 1 characters',
  }),
});

export type TCreateMessage = z.infer<typeof createMessageSchema>;
