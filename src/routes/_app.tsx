import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: App,
});

function App() {
  return (
    <main>
      <div>navbar</div>
      <Outlet />
      <div>footer</div>
    </main>
  );
}
