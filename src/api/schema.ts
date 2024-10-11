import { z } from 'zod';

export const LoginCredientials = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginCredientials = z.infer<typeof LoginCredientials>;
