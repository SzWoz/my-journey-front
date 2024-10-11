import { LoginCredientials } from '@/api/schema';
import { z } from 'zod';

export type LoginCredientials = z.infer<typeof LoginCredientials>;
