import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';

type CreatePassangersProps = {
  setPassangers: (Passanger: { name: string; id: string }) => void;
};

export function CreatePassangers({ setPassangers }: CreatePassangersProps) {
  const [passangerName, setPassangerName] = useState<string>('');

  const handlePassangerInput = () => {
    const newPassanger = {
      name: passangerName,
      id: uuidv4(),
    };

    setPassangers(newPassanger);
  };

  return (
    <div>
      <Input value={passangerName} onChange={e => setPassangerName(e.target.value)} />

      <Button onClick={() => handlePassangerInput()}>Add Passanger</Button>
    </div>
  );
}
