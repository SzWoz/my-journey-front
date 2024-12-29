import { fetchVehicle, fetchVehicles } from '@/api/vehicles';
import { queryOptions } from '@tanstack/react-query';

export const vehiclesQueryOptions = queryOptions({
  queryKey: ['vehicles'],
  queryFn: () => fetchVehicles(),
});

export const vehicleQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['vehicle', id],
    queryFn: () => fetchVehicle(id),
  });
