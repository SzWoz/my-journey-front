import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useMapControls } from '@/hooks/useMapControls';
import Autocomplete from './-components/autocomplete';
import MapView from './-components/map-view';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const Route = createFileRoute('/_app/_authenticated/dashboard/')({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { locations, addLocation, formattedTotalDistance, setTotalDistance, editLocation } = useMapControls();

  return (
    <section className="">
      <div>user statistics</div>

      <div className="grid h-[70vh] grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-md">
          <MapView locations={locations} setTotalDistance={setTotalDistance} editLocation={editLocation} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Plan Your Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid">
              <Autocomplete addLocation={addLocation} />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Distance from start</TableHead>
                    <TableHead>Assigned user/s</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locations.map((location, index) => (
                    <TableRow key={index}>
                      <TableCell>{location.data.formattedAddress}</TableCell>
                      <TableCell>{location?.distance}</TableCell>
                      <TableCell>None</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {formattedTotalDistance}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
