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
    if (passangerName === '') return;
    const newPassanger = {
      name: passangerName,
      id: uuidv4(),
    };

    setPassangers(newPassanger);
    setPassangerName('');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Input value={passangerName} onChange={e => setPassangerName(e.target.value)} />

      <Button className="w-fit" onClick={() => handlePassangerInput()}>
        Add Passanger
      </Button>
    </div>
  );
}
