import { Journey, Journeys, LocationObject } from './schema';
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

  try {
    const data = await response.json();
    return Journey.parse(data);
  } catch (e) {
    console.error(e);
  }
};

export const fetchJourneys = async () => {
  const response = await ky.get('journeys').json();

  try {
    return Journeys.parse(response);
  } catch (e) {
    console.error(e);
  }
};

export const updateJourney = async (journeyId: string, locations: LocationObject[], vehicle_id: string) => {
  const response = await ky.put(`journeys/${journeyId}`, {
    json: {
      vehicle_id,
      locations,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to update journey');
  }

  try {
    const data = await response.json();
    return Journey.parse(data);
  } catch (e) {
    console.error(e);
  }
};
