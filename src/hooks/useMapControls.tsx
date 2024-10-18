import { LocationObject, Passanger } from '@/api/schema';
import { useCallback, useMemo, useState } from 'react';

const MOCKED_LOCATIONS: LocationObject[] = [
  {
    data: {
      lat: 50.2936331,
      lng: 18.7381664,
      formattedAddress: 'Bracka 9, 44-103 Gliwice, Polska',
    },
    distance: 23367,
    assignedUsers: [],
  },
  {
    data: {
      lat: 50.29386019999999,
      lng: 18.6650001,
      formattedAddress: 'Rynek 6, 44-100 Gliwice, Polska',
    },
    assignedUsers: [],
  },
  {
    data: {
      lat: 50.2794001,
      lng: 18.95634,
      formattedAddress: 'Sportowa 29, 41-506 Chorzów, Polska',
    },
    assignedUsers: [],
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

  const assignUsers = useCallback((index: number, users: Passanger[]) => {
    setLocations(prevLocations => {
      const newLocations = [...prevLocations];
      newLocations[index].assignedUsers = users;
      return newLocations;
    });
  }, []);

  return { locations, addLocation, formattedTotalDistance, setTotalDistance, editLocation, assignUsers };
}
