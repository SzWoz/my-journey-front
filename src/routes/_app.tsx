import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import Navbar from '@/components/navbar';
import { AnimatePresence } from 'framer-motion';

export const Route = createFileRoute('/_app')({
  component: App,
});

function App() {
  return (
    <AnimatePresence>
      <main className="bg-gradient-black">
        <Navbar />

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
    </AnimatePresence>
  );
}
