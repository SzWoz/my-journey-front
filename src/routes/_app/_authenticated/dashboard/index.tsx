import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/_app/_authenticated/dashboard/')({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div>
      <button>dashboard</button>
    </div>
  );
}
