import { fetchVehicles } from '@/api/vehicles';
import { queryOptions } from '@tanstack/react-query';

export const vehiclesQueryOptions = queryOptions({
  queryKey: ['vehicles'],
  queryFn: () => fetchVehicles(),
});
