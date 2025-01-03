import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { journeyQueryOptions } from '@/queries/journeys';
import JourneyAccordion from '../-components/journey-accordeon';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_authenticated/user/journeys/')({
  component: Journeys,
});

function Journeys() {
  const { data: journeys, error, isLoading } = useQuery(journeyQueryOptions);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading journeys</div>;
  }

  return (
    <div>
      <h1>Journeys</h1>
      <div className="grid gap-4">
        {journeys?.map(journey => <JourneyAccordion key={journey.id} journey={journey} />)}
      </div>
    </div>
  );
}

export default Journeys;
