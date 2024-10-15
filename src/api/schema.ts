import { z } from 'zod';

export const LoginCredientials = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginCredientials = z.infer<typeof LoginCredientials>;

export const RegisterCredientials = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
});

export type RegisterCredientials = z.infer<typeof RegisterCredientials>;

export const LatLngObject = z.object({
  formattedAddress: z.string(),
  lat: z.number(),
  lng: z.number(),
});

export type LatLngObject = z.infer<typeof LatLngObject>;
