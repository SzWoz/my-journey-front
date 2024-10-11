import { createFileRoute, Outlet } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/auth/_auth')({
  component: Layout,
});

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
