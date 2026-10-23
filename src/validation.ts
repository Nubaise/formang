
import { z } from 'zod';

export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .length(5, 'First name must be exactly 5 characters'),

    lastName: z
      .string()
      .max(10, 'Last name cannot exceed 10 characters'),

    age: z.preprocess(
      (value) =>
        value === '' || value === undefined || value === null
          ? undefined
          : Number(value),
      z
        .number({ error: 'Age is required' })
        .min(17, 'Age must be at least 17')
        .max(20, 'Age must be at most 20'),
    ),

    email: z
      .string()
      .min(1, 'Email is required')
      .email('Enter a valid email address'),

    phone: z
      .string()
      .max(10, 'Phone cannot exceed 10 digits')
      .regex(/^\d*$/, 'Phone must contain numbers only'),

    city: z
      .string()
      .min(1, 'Please select a city')
      .refine(
        (value) => ['Mumbai', 'Kolkata', 'Delhi'].includes(value),
        'Please select a valid city',
      ),

    gender: z.enum(
      ['Male', 'Female', 'Prefer Not to Say'],
      { error: 'Please select your gender' },
    ),

    militaryStatus: z.string().optional(),

    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must contain at least 6 characters'),

    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .superRefine((data, ctx) => {
    if (data.gender === 'Male' && !data.militaryStatus) {
      ctx.addIssue({
        code: 'custom',
        path: ['militaryStatus'],
        message: 'Military service status is required',
      });
    }

    if (
      data.confirmPassword.length > 0 &&
      data.confirmPassword !== data.password
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }
  });

export type RegistrationFormData = z.infer<
  typeof registrationSchema
>;
