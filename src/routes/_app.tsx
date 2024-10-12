import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: App,
});

function App() {
  return (
    <main>
      <div className="text-red-500">navbar</div>
      <Outlet />
      <div>footer</div>
    </main>
  );
}
