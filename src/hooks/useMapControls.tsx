import { LocationObject } from '@/api/schema';
import { useCallback, useMemo, useState } from 'react';

export function useMapControls() {
  const [locations, setLocations] = useState<LocationObject[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  const formattedTotalDistance = useMemo(() => {
    return `${(totalDistance / 1000).toFixed(2)} km`;
  }, [totalDistance]);

  const addLocation = useCallback((location: LocationObject) => {
    setLocations(prevLocations => [...prevLocations, location]);
  }, []);

  const editLocation = useCallback((index: number, location: LocationObject) => {
    console.log({ location });
    setLocations(prevLocations => {
      const newLocations = [...prevLocations];
      newLocations[index] = location;
      return newLocations;
    });
  }, []);

  return { locations, addLocation, formattedTotalDistance, setTotalDistance, editLocation };
}
