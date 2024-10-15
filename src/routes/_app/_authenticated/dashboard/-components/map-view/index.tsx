import { LatLngObject } from '@/api/schema';
import { Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';

const DEFAULT_POSITION = { lat: 52.2297, lng: 21.0122 } as const;

type MapViewProps = {
  locations: LatLngObject[];
  setTotalDistance: (distance: number) => void;
};

function MapView({ locations, setTotalDistance }: MapViewProps) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionService, setDirectionService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (!map || !routesLibrary) return;

    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [map, routesLibrary]);

  console.log({ locations });

  useEffect(() => {
    if (!directionService || !directionsRenderer || locations.length < 2) return;

    const waypoints = locations.slice(1, locations.length - 1).map(location => ({
      location,
      stopover: true,
    }));

    directionService.route(
      {
        origin: locations[0],
        destination: locations[locations.length - 1],
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK' && response) {
          directionsRenderer.setDirections(response);

          const totalDistance = response.routes[0].legs.reduce((total, leg) => {
            if (leg.distance) {
              return total + leg.distance.value;
            }
            return total;
          }, 0);

          setTotalDistance(totalDistance);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      },
    );
  }, [directionService, directionsRenderer, locations]);

  return (
    <Map className="size-full" defaultZoom={9} defaultCenter={locations[0] || DEFAULT_POSITION} disableDefaultUI />
  );
}

export default MapView;
