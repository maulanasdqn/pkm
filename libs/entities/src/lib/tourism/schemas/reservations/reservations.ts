import { z } from 'zod';

export const reservationSchema = z.object({
  id: z.string(),
  name: z.string({ required_error: 'name is required!' }).min(1, {
    message: 'name must be at least 1 characters',
  }),
  email: z.string().email({
    message: 'please provide a valid email!',
  }),
  phoneNumber: z
    .string()
    .min(8, {
      message: 'phone number must be at least 8 characters',
    })
    .regex(
      /^\+?\d+$/,
      'nomor telepon harus berupa angka, dan bisa diawali dengan simbol +'
    ),
  date: z.date({ required_error: 'date is required!' }),
  time: z.string({ required_error: 'time is required!' }),
  quantity: z.number({ required_error: 'quantity is required!' }),
  total: z.coerce.number().min(0).int().nonnegative(),
  status: z
    .string({ required_error: 'status is required!' })
    .transform((val) => val.toLowerCase())
    .refine((val) => ['confirmed', 'reschedule', 'canceled'].includes(val), {
      message:
        'status harus diantara dikonfirmasi, dijadwal ulang atau dibatalkan',
    }),
  destination: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
});

export const checkReservationSchema = z.object({
  name: reservationSchema.shape.name,
  email: reservationSchema.shape.email,
  phoneNumber: reservationSchema.shape.phoneNumber,
});

export const createReservationSchema = z.object({
  name: reservationSchema.shape.name,
  email: reservationSchema.shape.email,
  phoneNumber: reservationSchema.shape.phoneNumber,
  date: reservationSchema.shape.date,
  time: reservationSchema.shape.time,
  quantity: reservationSchema.shape.quantity,
  total: reservationSchema.shape.total,
  status: reservationSchema.shape.status,
  destinationId: z.string({ required_error: 'destination id is required!' }),
});

export const updateReservationSchema = z.object({
  id: reservationSchema.shape.id,
  name: reservationSchema.shape.name,
  email: reservationSchema.shape.email,
  phoneNumber: reservationSchema.shape.phoneNumber,
  date: reservationSchema.shape.date,
  time: reservationSchema.shape.time,
  quantity: reservationSchema.shape.quantity,
  total: reservationSchema.shape.total,
  status: reservationSchema.shape.status,
  destinationId: z.string({ required_error: 'destination id is required!' }),
});

export type TReservationSchema = z.infer<typeof reservationSchema>;
export type TCheckReservationSchema = z.infer<typeof checkReservationSchema>;
export type TCreateReservationSchema = z.infer<typeof createReservationSchema>;
export type TUpdateReservationSchema = z.infer<typeof updateReservationSchema>;
