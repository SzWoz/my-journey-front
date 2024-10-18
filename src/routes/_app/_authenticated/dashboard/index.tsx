import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useMapControls } from '@/hooks/useMapControls';
import Autocomplete from './-components/autocomplete';
import MapView from './-components/map-view';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatePassangers } from './-components/passangers';
import { Passanger } from '@/api/schema';
import GenericTable from '@/components/generic-table';
import { MultiSelect } from '@/components/ui/multi-select';

export const Route = createFileRoute('/_app/_authenticated/dashboard/')({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { locations, addLocation, formattedTotalDistance, setTotalDistance, editLocation, assignUsers } =
    useMapControls();

  const [passangers, setPassangers] = useState<Passanger[]>([]);

  const handlePassangerInput = (newPassanger: Passanger) => {
    setPassangers(prev => [...prev, newPassanger]);
  };

  const processedLocations = locations.map(location => ({
    formattedAddress: location.data.formattedAddress,
    distance: location.distance ?? 0,
    assignedUsers: location.assignedUsers,
  }));

  console.log(locations);

  const assignPassangersToLocation = (index: number, ids: string[]) => {
    assignUsers(
      index,
      ids.map(id => passangers.find(passanger => passanger.id === id)!),
    );
  };

  return (
    <section className="">
      <div>user statistics</div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="col-span-3 h-[500px] max-h-[500px] overflow-hidden">
          <CardHeader>
            <CardTitle>Map Preview</CardTitle>
          </CardHeader>

          <CardContent className="h-[400px]">
            <MapView locations={locations} setTotalDistance={setTotalDistance} editLocation={editLocation} />
          </CardContent>
        </Card>
        <Card className="col-span-2 max-h-[500px] overflow-auto">
          <CardHeader>
            <CardTitle>Plan Your Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid">
              <Autocomplete addLocation={addLocation} />

              <GenericTable
                headers={['Location', 'Distance from start', 'Assigned user']}
                data={processedLocations}
                dataAccessors={['formattedAddress', 'distance', 'assignedUsers']}
                renderCell={(item, accessor, rowIndex) => {
                  if (accessor === 'assignedUsers') {
                    return (
                      <MultiSelect
                        options={passangers.map(passanger => ({ label: passanger.name, value: passanger.id }))}
                        onValueChange={ids => assignPassangersToLocation(rowIndex, ids)}
                        defaultValue={item.assignedUsers?.map(user => user.id) ?? []}
                        placeholder="Assign Passangers"
                        variant="inverted"
                        maxCount={2}
                      />
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
