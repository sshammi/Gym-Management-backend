import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }).min(4, { message: 'Password must be at least 6 characters long.' }),
  }),
});

export const AuthValidation={
    loginValidationSchema,
    refreshTokenValidationSchema,
    changePasswordValidationSchema,
}