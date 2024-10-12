import { userQueryOptions } from '@/queries/user';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import React, { useEffect } from 'react';

export const Route = createFileRoute('/_app/_authenticated')({
  component: Layout,
  errorComponent: ErrorComponent,
  loader: async ({ context: { queryClient } }) => await queryClient.ensureQueryData(userQueryOptions),
});

function ErrorComponent() {
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return <Navigate to="/auth/login" replace />;
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
