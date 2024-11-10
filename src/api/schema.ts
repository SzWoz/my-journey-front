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

export const User = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  // vehicles: z.array(Vehicle),
});

export const VehicleMenuItem = z.object({
  text: z.string(),
  value: z.string(),
});

export const VehicleData = z.object({
  avgMpg: z.string(),
  cityPercent: z.string(),
  highwayPercent: z.string(),
  maxMpg: z.string(),
  minMpg: z.string(),
  recordCount: z.string(),
  vehicleId: z.string(),
});

export const Vehicle = z.object({
  id: z.number(),
  manufacturer: z.string(),
  model: z.string(),
  year: z.number(),
  version: z.string(),
  fuel_efficiency: z.string(),
  fuel_type: z.string(),
});

export const Vehicles = z.array(Vehicle);

export type LoginCredientials = z.infer<typeof LoginCredientials>;
export type RegisterCredientials = z.infer<typeof RegisterCredientials>;
export type LatLngObject = z.infer<typeof LatLngObject>;
export type LocationObject = z.infer<typeof LocationObject>;
export type Passanger = z.infer<typeof Passanger>;
export type Vehicle = z.infer<typeof Vehicle>;
export type User = z.infer<typeof User>;
export type VehicleMenuItem = z.infer<typeof VehicleMenuItem>;
export type VehicleData = z.infer<typeof VehicleData>;
export type Vehicles = z.infer<typeof Vehicles>;
