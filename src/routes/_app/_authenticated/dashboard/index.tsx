import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useMapControls } from '@/hooks/useMapControls';
import Autocomplete from './-components/autocomplete';
import MapView from './-components/map-view';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatePassangers } from './-components/passangers';
import { Journey, LocationObject, Passanger } from '@/api/schema';
import GenericTable from '@/components/generic-table';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { vehiclesQueryOptions } from '@/queries/vehicles';
import { convertToKm } from '@/helpers/convertToKm';
import { toast } from 'sonner';
import { addJourney, updateJourney } from '@/api/journey';

export const Route = createFileRoute('/_app/_authenticated/dashboard/')({
  component: DashboardLayout,
});

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function DashboardLayout() {
  const {
    locations,
    addLocation,
    formattedTotalDistance,
    setTotalDistance,
    editLocation,
    assignUsers,
    unassignUser,
    removeLocation,
  } = useMapControls();

  const [passangers, setPassangers] = useState<Passanger[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>();
  const [journeyId, setJourneyId] = useState<string | null>(null);
  const [journeyData, setJourneyData] = useState<Journey>();

  const { data: vehicleData } = useQuery(vehiclesQueryOptions);

  const addJourneyMutation = useMutation({
    mutationFn: (data: { locations: LocationObject[]; vehicle_id: string }) => {
      if (journeyId) {
        // If journeyId exists, make a PUT request for updates
        return updateJourney(journeyId, data.locations, data.vehicle_id); // You need to implement updateJourney API call
      } else {
        // If no journeyId, make a POST request to create a new journey
        return addJourney(data.locations, data.vehicle_id);
      }
    },
    onSuccess: response => {
      console.log({ response });
      setJourneyId(String(response?.id));
      setJourneyData(response);
      toast.success('Journey added/updated successfully');
    },
    onError: () => {
      toast.error('Error adding/updating journey');
    },
  });

  const handlePassangerInput = (newPassanger: Passanger) => {
    setPassangers(prev => [...prev, newPassanger]);
  };

  const processedLocations = locations.map(location => ({
    formattedAddress: location.data.formattedAddress,
    distance: `${convertToKm(location.distance || 0)} km`,
    assignedUsers: location.assignedUsers,
  }));

  const assignPassangersToLocation = (index: number, ids: string[]) => {
    assignUsers(
      index,
      ids.map(id => passangers.find(passanger => passanger.id === id)!),
    );
  };

  const removePassanger = (id: string) => {
    setPassangers(prev => prev.filter(passanger => passanger.id !== id));
    unassignUser(id);
  };

  console.log(journeyData?.passengers.reduce((acc, passanger) => acc + parseFloat(passanger.cost), 0) || 0);

  return (
    <section className="">
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
          className="col-span-3 flex w-full items-center justify-between rounded-lg"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="w-full">
            <CardHeader></CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-around gap-4">
                <div className="flex flex-col items-center">
                  <p>Total Distance:</p>
                  <p className="text-2xl">{formattedTotalDistance || 'N/A'}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p>Total Cost:</p>
                  <p className="text-2xl">
                    {journeyData?.passengers.reduce((acc, passanger) => acc + parseFloat(passanger.cost), 0) || 0}zł
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p>Total Passengers:</p>
                  <p className="text-2xl">{passangers.length || 0}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p>Total Locations:</p>
                  <p className="text-2xl">{locations.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="col-span-2 max-h-[500px] overflow-auto"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-fit">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle>Plan Your Journey</CardTitle>
              <Select value={selectedVehicle} onValueChange={id => setSelectedVehicle(id)}>
                <SelectTrigger className="!mt-0 w-[180px]">
                  <SelectValue placeholder="Select your vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleData?.map(vehicle => (
                    <SelectItem key={vehicle.id} value={String(vehicle.id)}>
                      {vehicle.manufacturer} {vehicle.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Autocomplete addLocation={addLocation} />

                <Button
                  className="w-1/2 place-self-center"
                  onClick={() => {
                    if (!selectedVehicle) return toast.error('Select a vehicle first');
                    addJourneyMutation.mutate({ locations, vehicle_id: selectedVehicle });
                  }}
                  disabled={locations.length === 0 || !selectedVehicle || passangers.length === 0}
                >
                  Calculate Costs
                </Button>

                <GenericTable
                  headers={['Location', 'Distance from previous point', 'Assigned user']}
                  data={processedLocations}
                  dataAccessors={['formattedAddress', 'distance', 'assignedUsers']}
                  renderCell={(item, accessor, rowIndex) => {
                    if (accessor === 'assignedUsers') {
                      return (
                        <MultiSelect
                          options={passangers.map(passanger => ({ label: passanger.name, value: passanger.id }))}
                          onValueChange={ids => assignPassangersToLocation(rowIndex, ids)}
                          setSelectedValues={ids => assignPassangersToLocation(rowIndex, ids)}
                          selectedValues={item.assignedUsers?.map(user => user.id) ?? []}
                          placeholder="Assign Passangers"
                          variant="inverted"
                          maxCount={2}
                        />
                      );
                    }
                    return String(item[accessor]);
                  }}
                  actionButton={item => (
                    <Button variant="outline" onClick={() => removeLocation(item.formattedAddress)}>
                      X
                    </Button>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="max-h-[500px] overflow-auto"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Add passangers</CardTitle>
            </CardHeader>
            <CardContent>
              <CreatePassangers
                passangers={passangers}
                setPassangers={newPassanger => handlePassangerInput(newPassanger)}
              />

              <GenericTable
                data={passangers}
                headers={['Name']}
                dataAccessors={['name']}
                actionButton={item => (
                  <Button variant="outline" onClick={() => removePassanger(item.id)}>
                    Delete
                  </Button>
                )}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default DashboardLayout;
