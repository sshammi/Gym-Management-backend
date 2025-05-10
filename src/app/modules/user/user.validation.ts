import { z } from "zod";

export const userCreateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required.' }),
    email: z.string({ required_error: 'Email is required.' }).email(),
    password: z
      .string({ required_error: 'Password is required.' })
      .min(6, { message: 'Password must be at least 6 characters long.' }),
    role: z.enum(['admin', 'trainer', 'trainee']).default('trainee'),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const userUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required.' }).optional(),
    email: z.string({ required_error: 'Email is required.' }).email().optional(),
    password: z
      .string({ required_error: 'Password is required.' })
      .min(6, { message: 'Password must be at least 6 characters long.' }).optional(),
    role: z.enum(['admin', 'trainer', 'trainee']).default('trainee').optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});
