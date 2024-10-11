import { fetchUser } from '@/api/user';
import { queryOptions } from '@tanstack/react-query';

export const userQueryOptions = queryOptions({
  queryKey: ['profile'],
  queryFn: () => fetchUser(),
  retry: false,
});
