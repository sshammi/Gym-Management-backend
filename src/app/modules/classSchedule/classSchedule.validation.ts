import { z } from 'zod';

export const createClassScheduleZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).trim(),
    description: z.string().trim().optional(),
    startTime: z.string({ required_error: 'Start time is required' }),
    endTime: z.string({ required_error: 'End time is required' }),
    trainerId: z.string({ required_error: 'Trainer ID is required' }),
    maxCapacity: z.number().min(1, 'Capacity must be at least 1').max(10, 'Capacity cannot exceed 10').optional(),
    status: z.enum(['active', 'cancelled', 'completed']).optional(), // default is handled in Mongoose
  }),
});

export const updateClassScheduleZodSchema = z.object({
  body: z.object({
    title: z.string().trim().optional(),
    description: z.string().trim().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    trainerId: z.string().optional(),
    maxCapacity: z.number().min(1).max(10).optional(),
    status: z.enum(['active', 'cancelled', 'completed']).optional(),
  }),
});
