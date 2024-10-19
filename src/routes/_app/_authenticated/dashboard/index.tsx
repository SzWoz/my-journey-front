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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/_app/_authenticated/dashboard/')({
  component: DashboardLayout,
});

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function DashboardLayout() {
  const { locations, addLocation, formattedTotalDistance, setTotalDistance, editLocation, assignUsers } =
    useMapControls();

  const [passangers, setPassangers] = useState<Passanger[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>();

  // this will come from backend
  const vehicles = [
    { id: '1', name: 'Car' },
    { id: '2', name: 'Bike' },
    { id: '3', name: 'Bus' },
  ];

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
        <motion.div
          className="col-span-3 h-[500px] max-h-[500px] overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Map Preview</CardTitle>
            </CardHeader>

            <CardContent className="h-[400px]">
              <MapView locations={locations} setTotalDistance={setTotalDistance} editLocation={editLocation} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="col-span-2 max-h-[500px] overflow-auto"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle>Plan Your Journey</CardTitle>
              <Select value={selectedVehicle} onValueChange={id => setSelectedVehicle(id)}>
                <SelectTrigger className="!mt-0 w-[180px]">
                  <SelectValue placeholder="Select your vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map(vehicle => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
        </motion.div>

        <motion.div
          className="max-h-[500px] overflow-auto"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Add passangers</CardTitle>
            </CardHeader>
            <CardContent>
              <CreatePassangers setPassangers={newPassanger => handlePassangerInput(newPassanger)} />

              <GenericTable data={passangers} headers={['Name']} dataAccessors={['name']} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default DashboardLayout;
