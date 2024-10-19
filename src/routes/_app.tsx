import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: App,
});

function App() {
  return (
    <main className="bg-gradient-black">
      <div className="text-red-500">navbar</div>

      <div className="p-8">
        <Outlet />
      </div>
      <footer>
        Loading animation source:
        <a href="https://www.flaticon.com/free-animated-icons/transportation" title="transportation animated icons">
          Transportation animated icons created by Freepik - Flaticon
        </a>
      </footer>
    </main>
  );
}
