import { LocationObject } from '@/api/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type AutocompleteProps = {
  addLocation: (location: LocationObject) => void;
};

function Autocomplete({ addLocation }: AutocompleteProps) {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [isValidLocation, setIsValidLocation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  const handleLocationSelection = useCallback(() => {
    const place = placeAutocomplete?.getPlace();
    const lat = place?.geometry?.location?.lat();
    const lng = place?.geometry?.location?.lng();
    const formattedAddress = place?.formatted_address || '';

    if (lat && lng) {
      addLocation({ data: { lat, lng, formattedAddress } });
      setIsValidLocation(false); // Reset validation
      if (inputRef.current) inputRef.current.value = ''; // Clear input field
    } else {
      toast.error('Failed to get location');
    }
  }, [placeAutocomplete, addLocation]);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    const autocomplete = new places.Autocomplete(inputRef.current, options);
    setPlaceAutocomplete(autocomplete);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.formatted_address) {
        setIsValidLocation(true); // Mark as valid location
      } else {
        setIsValidLocation(false);
      }
    });

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [places]);

  return (
    <div className="flex items-center gap-4">
      <Input ref={inputRef} placeholder="Search for a location" />
      <Button
        onClick={handleLocationSelection}
        disabled={!isValidLocation} // Disable button until a valid location is selected
      >
        Select Location
      </Button>
    </div>
  );
}

export default Autocomplete;
