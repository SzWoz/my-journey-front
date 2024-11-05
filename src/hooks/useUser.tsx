import { removeToken } from '@/api/utils/token';
import { userQueryOptions } from '@/queries/user';
import { useAuthStore } from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useUser = () => {
  const { isAuthenticated } = useAuthStore();

  const query = useQuery({ ...userQueryOptions, enabled: isAuthenticated });

  useEffect(() => {
    if (query.error) return removeToken();
  }, [query.error]);

  return query;
};
