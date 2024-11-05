import AddVehicle from '@/components/add-vehicle';
import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/_app/_authenticated/user/settings/')({
  component: Settings,
});

function Settings() {
  return (
    <section className="min-h-screen">
      <h1>Settings</h1>
      <AddVehicle />
    </section>
  );
}
