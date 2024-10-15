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

  const calculateDistanceFromStart = useCallback(
    (index: number) => {
      if (index === 0 || index >= locations.length) return 0;

      const toRad = (value: number) => (value * Math.PI) / 180;

      const { lat: lat1, lng: lng1 } = locations[0];
      const { lat: lat2, lng: lng2 } = locations[index];

      const R = 6371e3; // Earth's radius in meters
      const φ1 = toRad(lat1);
      const φ2 = toRad(lat2);
      const Δφ = toRad(lat2 - lat1);
      const Δλ = toRad(lng2 - lng1);

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c; // in meters
      return distance;
    },
    [locations],
  );

  return { locations, addLocation, formattedTotalDistance, setTotalDistance, calculateDistanceFromStart };
}
