import { LatLngObject } from '@/api/schema';
import { useCallback, useMemo, useState } from 'react';

export function useMapControls() {
  const [locations, setLocations] = useState<LatLngObject[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  const formattedTotalDistance = useMemo(() => {
    return `${(totalDistance / 1000).toFixed(2)} km`;
  }, [totalDistance]);

  const addLocation = useCallback((location: LatLngObject) => {
    setLocations(prevLocations => [...prevLocations, location]);
  }, []);

  return { locations, addLocation, formattedTotalDistance, setTotalDistance };
}
