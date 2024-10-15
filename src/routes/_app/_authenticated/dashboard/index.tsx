import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useMapControls } from '@/hooks/useMapControls';
import Autocomplete from './-components/autocomplete';
import MapView from './-components/map-view';

export const Route = createFileRoute('/_app/_authenticated/dashboard/')({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { locations, addLocation, formattedTotalDistance, setTotalDistance } = useMapControls();

  return (
    <section className="grid">
      <div>user statistics</div>
      {formattedTotalDistance && <div>Total Distance: {formattedTotalDistance}</div>}

      <div>map</div>
      <div>
        <Autocomplete addLocation={addLocation} />
      </div>
      <div className="h-[70vh] w-full">
        <MapView locations={locations} setTotalDistance={setTotalDistance} />
      </div>
    </section>
  );
}
