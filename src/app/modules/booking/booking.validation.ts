import { z } from 'zod';

export const createBookingZodSchema = z.object({
  body: z.object({
    traineeId: z.string({ required_error: 'Trainee ID is required' }),
    scheduleId: z.string({ required_error: 'Schedule ID is required' }),
    status: z.enum(['booked', 'cancelled', 'completed']).optional(), // default will be handled by the model
  }),
});

export const updateBookingZodSchema = z.object({
  body: z.object({
    traineeId: z.string().optional(),
    scheduleId: z.string().optional(),
    status: z.enum(['booked', 'cancelled', 'completed']).optional(),
  }),
});
