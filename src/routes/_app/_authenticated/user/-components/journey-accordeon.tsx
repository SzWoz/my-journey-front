import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MapView from '../../dashboard/-components/map-view';
import { Journey } from '@/api/schema';
import { vehicleQueryOptions } from '@/queries/vehicles';
import { useQuery } from '@tanstack/react-query';

type JourneyAccordionProps = {
  journey: Journey;
};

const JourneyAccordion = ({ journey }: JourneyAccordionProps) => {
  const { data: vehicle } = useQuery(vehicleQueryOptions(journey.vehicle_id));

  // Calculate total distance
  const totalDistance =
    journey.locations.reduce((sum, location, index) => {
      if (index === 0) return sum; // Skip the first location as there's no previous point
      const distance = location.distance || 0; // Ensure distance is defined
      return sum + distance;
    }, 0) / 1000; // Convert meters to kilometers

  const startLocation = journey.locations[0]?.formatted_address || 'N/A';
  const endLocation = journey.locations[journey.locations.length - 1]?.formatted_address || 'N/A';

  return (
    <Accordion type="single" collapsible>
      <AccordionItem key={journey.id} value={String(journey.id)}>
        <AccordionTrigger>
          <div className="flex w-[90%] items-center justify-between gap-4">
            <span>
              {vehicle?.manufacturer} {vehicle?.model}
            </span>
            <span className="grid gap-2">
              <span>Starting Location: {startLocation}</span>
              <span>Final Location: {endLocation}</span>
            </span>
            <span>{new Date(journey.created_at).toLocaleString()}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Card className="border-white-700 text-neutral-200">
            <CardHeader>
              <CardTitle>Journey Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <p>
                    <strong>Vehicle:</strong> {vehicle?.manufacturer} {vehicle?.model}
                  </p>
                  <p>
                    <strong>Total Distance:</strong> {totalDistance.toFixed(2)} km
                  </p>
                  <p>
                    <strong>Passengers:</strong>
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {journey.passengers.map(participant => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between rounded-lg border border-white p-2"
                      >
                        <span>{participant.name}</span>
                        <span>{participant.cost} zł</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="min-h-[250px]">
                  <MapView
                    locations={journey.locations.map(location => ({
                      data: {
                        lat: location.lat,
                        lng: location.lng,
                        formattedAddress: location.formatted_address,
                      },
                    }))}
                    setTotalDistance={() => {}}
                    editLocation={() => {}}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default JourneyAccordion;
