import { fetchJourneys } from '@/api/journey';
import { queryOptions } from '@tanstack/react-query';

export const journeyQueryOptions = queryOptions({
  queryKey: ['journeys'],
  queryFn: () => fetchJourneys(),
  retry: false,
});
