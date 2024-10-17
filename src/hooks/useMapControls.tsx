import { LocationObject } from '@/api/schema';
import { useCallback, useMemo, useState } from 'react';

const MOCKED_LOCATIONS: LocationObject[] = [
  {
    data: {
      formattedAddress: 'Location 1',
      lat: 51.5074,
      lng: 0.1278,
    },
  },
  {
    data: {
      formattedAddress: 'Location 2',
      lat: 51.5074,
      lng: 0.1278,
    },
  },
  {
    data: {
      formattedAddress: 'Location 3',
      lat: 51.5074,
      lng: 0.1278,
    },
  },
];

export function useMapControls() {
  const [locations, setLocations] = useState<LocationObject[]>(MOCKED_LOCATIONS);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  const formattedTotalDistance = useMemo(() => {
    return `${(totalDistance / 1000).toFixed(2)} km`;
  }, [totalDistance]);

  const addLocation = useCallback((location: LocationObject) => {
    setLocations(prevLocations => [...prevLocations, location]);
  }, []);

  const editLocation = useCallback((index: number, location: LocationObject) => {
    setLocations(prevLocations => {
      const newLocations = [...prevLocations];
      newLocations[index] = location;
      return newLocations;
    });
  }, []);

  return { locations, addLocation, formattedTotalDistance, setTotalDistance, editLocation };
}
