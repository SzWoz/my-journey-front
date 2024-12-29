import { Journeys, LocationObject } from './schema';
import ky from './utils/ky';

export const addJourney = async (locations: LocationObject[], vehicle_id: string) => {
  const response = await ky.post('journeys', {
    json: {
      vehicle_id,
      locations,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to add journey');
  }

  return response.json();
};

export const fetchJourneys = async () => {
  const response = await ky.get('journeys').json();

  console.log({ response });

  try {
    return Journeys.parse(response);
  } catch (e) {
    console.log(e);
  }
};
