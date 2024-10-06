import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: () => App,
});

function App() {
  return (
    <main>
      <Outlet />
      <div>Hello from app</div>
    </main>
  );
}
