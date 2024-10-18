import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useMapControls } from '@/hooks/useMapControls';
import Autocomplete from './-components/autocomplete';
import MapView from './-components/map-view';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatePassangers } from './-components/passangers';
import { Passanger } from '@/api/schema';
import GenericTable from '@/components/generic-table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const Route = createFileRoute('/_app/_authenticated/dashboard/')({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { locations, addLocation, formattedTotalDistance, setTotalDistance, editLocation, assignUser } =
    useMapControls();

  const [passangers, setPassangers] = useState<Passanger[]>([]);

  const handlePassangerInput = (newPassanger: Passanger) => {
    setPassangers(prev => [...prev, newPassanger]);
  };

  const processedLocations = locations.map(location => ({
    formattedAddress: location.data.formattedAddress,
    distance: location.distance ?? 0,
    assignedUserId: location.assignedUserId,
  }));

  return (
    <section className="">
      <div>user statistics</div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="col-span-2 row-span-1 overflow-hidden rounded-md">
          <MapView locations={locations} setTotalDistance={setTotalDistance} editLocation={editLocation} />
        </div>
        <Card className="max-h-[500px] overflow-auto">
          <CardHeader>
            <CardTitle>Plan Your Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid">
              <Autocomplete addLocation={addLocation} />

              <GenericTable
                headers={['Location', 'Distance from start', 'Assigned user']}
                data={processedLocations}
                dataAccessors={['formattedAddress', 'distance', 'assignedUserId']}
                renderCell={(item, accessor, rowIndex) => {
                  if (accessor === 'assignedUserId') {
                    return (
                      <Select value={item.assignedUserId ?? ''} onValueChange={id => assignUser(rowIndex, id)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Assign user">
                            {item.assignedUserId
                              ? passangers.find(passanger => passanger.id === item.assignedUserId)?.name
                              : null}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            Users
                            {passangers.map(passanger => (
                              <SelectItem key={passanger.id} value={passanger.id}>
                                {passanger.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  }
                  return String(item[accessor]);
                }}
              />
              {formattedTotalDistance}
            </div>
          </CardContent>
        </Card>

        <Card className="max-h-[500px] overflow-auto">
          <CardHeader>
            <CardTitle>Add passangers</CardTitle>
          </CardHeader>
          <CardContent>
            <CreatePassangers setPassangers={newPassanger => handlePassangerInput(newPassanger)} />

            <GenericTable data={passangers} headers={['Name']} dataAccessors={['name']} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
