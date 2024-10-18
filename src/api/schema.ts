import { z } from 'zod';

export const LoginCredientials = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const RegisterCredientials = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
});

export const Passanger = z.object({
  name: z.string(),
  id: z.string(),
});

export const LatLngObject = z.object({
  formattedAddress: z.string(),
  lat: z.number(),
  lng: z.number(),
});

export const LocationObject = z.object({
  data: LatLngObject,
  distance: z.number().optional(),
  assignedUsers: z.array(Passanger).optional(),
});

export type LoginCredientials = z.infer<typeof LoginCredientials>;
export type RegisterCredientials = z.infer<typeof RegisterCredientials>;
export type LatLngObject = z.infer<typeof LatLngObject>;
export type LocationObject = z.infer<typeof LocationObject>;
export type Passanger = z.infer<typeof Passanger>;
