import React, { Suspense } from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div>
      <Outlet />
      <div>Hello from root</div>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
      <ReactQueryDevtools />
    </div>
  );
}
