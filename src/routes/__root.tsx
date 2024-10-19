import React, { Suspense, useEffect, useState } from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuthStore } from '@/stores/useAuthStore';
import { userQueryOptions } from '@/queries/user';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { removeToken } from '@/api/utils/token';
import Loader from '@/components/loader';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
});

function RootComponent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { setIsAuthenticated } = useAuthStore();

  const query = useQuery(userQueryOptions);

  useEffect(() => {
    if (query.isSuccess) {
      setIsAuthenticated(true);
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isError) {
      setIsAuthenticated(false);
      removeToken();
    }
  }, [query.isError]);

  useEffect(() => {
    const minimumLoadingTime = new Promise(resolve => setTimeout(resolve, 1500));
    const queryLoading = query.isLoading ? query.refetch() : Promise.resolve();

    Promise.all([minimumLoadingTime, queryLoading]).then(() => {
      setIsLoaded(true);
    });
  }, [query.isLoading]);

  return (
    <div className="min-h-screen">
      {isLoaded ? <Outlet /> : <Loader />}
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
      <ReactQueryDevtools />
    </div>
  );
}
