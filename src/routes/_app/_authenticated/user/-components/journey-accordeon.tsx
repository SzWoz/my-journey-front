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
  return (
    <Accordion type="single" collapsible>
      <AccordionItem key={journey.id} value={String(journey.id)}>
        <AccordionTrigger>
          <div className="flex justify-between">
            <span>{journey.name}</span>
            <span>
              {vehicle?.manufacturer} {vehicle?.model}{' '}
            </span>
            <span>{journey.passengers.map(p => p.name).join(', ')}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardHeader>
              <CardTitle>Journey Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2">
                <div>
                  <p>Distance: {journey.distance} km</p>
                  <p>Passengers:</p>
                  <ul>
                    {journey.passengers.map(participant => (
                      <li key={participant.id}>
                        {participant.name} - Cost: {participant.cost}zł
                      </li>
                    ))}
                  </ul>
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
