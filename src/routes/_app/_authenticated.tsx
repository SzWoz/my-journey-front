import { userQueryOptions } from '@/queries/user';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/_app/_authenticated')({
  component: Layout,
  loader: async ({ context: { queryClient } }) => await queryClient.ensureQueryData(userQueryOptions),
});

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
