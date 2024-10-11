import React, { Suspense, useEffect } from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuthStore } from '@/stores/useAuthStore';
import { userQueryOptions } from '@/queries/user';
import { QueryClient, useQuery } from '@tanstack/react-query';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
});

function RootComponent() {
  const { setIsAuthenticated } = useAuthStore();

  const query = useQuery(userQueryOptions);

  useEffect(() => {
    if (query.isSuccess) {
      setIsAuthenticated(true);
    }
  }, [query.isSuccess]);

  return (
    <div>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
      <ReactQueryDevtools />
    </div>
  );
}
