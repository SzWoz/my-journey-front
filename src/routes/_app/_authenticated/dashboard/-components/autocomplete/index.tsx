import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

function Autocomplete({
  addLocation,
}: {
  addLocation: (location: { lat: number; lng: number; formattedAddress: string }) => void;
}) {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  const handleLocationSelection = useCallback(() => {
    const place = placeAutocomplete?.getPlace();
    const lat = place?.geometry?.location?.lat();
    const lng = place?.geometry?.location?.lng();
    const formattedAddress = place?.formatted_address || '';

    if (lat && lng) {
      addLocation({ lat, lng, formattedAddress });
    } else {
      toast.error('Failed to get location');
    }
  }, [placeAutocomplete]);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Input ref={inputRef} />
      <Button onClick={() => handleLocationSelection()}>Select Location</Button>
    </div>
  );
}

export default Autocomplete;
