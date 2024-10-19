import { LocationObject } from '@/api/schema';
import { Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';

const DEFAULT_POSITION = { lat: 52.2297, lng: 21.0122 } as const;

type MapViewProps = {
  locations: LocationObject[];
  setTotalDistance: (distance: number) => void;
  editLocation: (index: number, location: LocationObject) => void;
};

const mockResponse = {
  routes: [
    {
      legs: [
        {
          distance: { value: 10000 }, // 10 km
        },
        {
          distance: { value: 20000 }, // 20 km
        },
      ],
    },
  ],
};

function MapView({ locations, setTotalDistance, editLocation }: MapViewProps) {
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
      location: location.data,
      stopover: true,
    }));

    // Mocking the response instead of calling the actual API
    const response = mockResponse;
    const status = 'OK';

    if (status === 'OK' && response) {
      directionsRenderer.setDirections(response as any); // Cast to any to avoid type errors

      const totalDistance = response.routes[0].legs.reduce((total, leg) => {
        if (leg.distance) {
          return total + leg.distance.value;
        }
        return total;
      }, 0);

      const locationsWithDistance = locations.map((location, index) => {
        if (index === 0) {
          return { ...location, distance: undefined }; // Starting location has no distance
        }
        const distance = response.routes[0].legs[index - 1]?.distance?.value || 0;
        return { ...location, distance };
      });

      locationsWithDistance.forEach((location, index) => {
        editLocation(index, location);
      });

      setTotalDistance(totalDistance);
    } else {
      console.error('Directions request failed due to ' + status);
    }

    // Production code commented out

    // directionService.route(
    //   {
    //     origin: locations[0].data,
    //     destination: locations[locations.length - 1].data,
    //     waypoints,
    //     travelMode: google.maps.TravelMode.DRIVING,
    //   },
    //   (response, status) => {
    //     if (status === 'OK' && response) {
    //       directionsRenderer.setDirections(response);
    //       console.log(response);

    //       const totalDistance = response.routes[0].legs.reduce((total, leg) => {
    //         if (leg.distance) {
    //           return total + leg.distance.value;
    //         }
    //         return total;
    //       }, 0);

    //       const newLocations = [...locations];
    //       response.routes[0].legs.forEach(leg => {
    //         const location = locations.find(l => l.data.formattedAddress === leg.end_address);
    //         const distance = leg.distance?.value || 0;
    //         if (location) {
    //           newLocations{
    //             ...location,
    //             distance,
    //           };
    //         }
    //       });

    //       // Only update locations if they have changed
    //       if (JSON.stringify(newLocations) !== JSON.stringify(prevLocationsRef.current)) {
    //         newLocations.forEach((location, index) => {
    //           editLocation(index, location);
    //         });
    //         prevLocationsRef.current = newLocations;
    //       }

    //       setTotalDistance(totalDistance);
    //     } else {
    //       console.error('Directions request failed due to ' + status);
    //     }
    //   },
    // );
  }, [directionService, directionsRenderer, locations.length]);

  const styles = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ];

  return (
    <Map
      styles={styles}
      className="size-full"
      defaultZoom={9}
      defaultCenter={locations[0]?.data || DEFAULT_POSITION}
      disableDefaultUI
    />
  );
}

export default MapView;
