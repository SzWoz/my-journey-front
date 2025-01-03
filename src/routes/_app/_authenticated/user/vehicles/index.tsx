import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import AddVehicle from '../-components/add-vehicle';
import VehicleTable from '../-components/vehicles-table';

export const Route = createFileRoute('/_app/_authenticated/user/vehicles/')({
  component: Vehicles,
});

function Vehicles() {
  return (
    <section className="grid min-h-screen grid-cols-3 gap-4">
      <div className="col-span-1">
        <AddVehicle />
      </div>
      <div className="col-span-2">
        <VehicleTable />
      </div>
    </section>
  );
}
