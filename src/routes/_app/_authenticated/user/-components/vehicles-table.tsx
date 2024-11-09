import React, { useState, useEffect } from 'react';
import ky from '@/api/utils/ky';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GenericTable from '@/components/generic-table';

interface Vehicle {
  id: string;
  year: string;
  manufacturer: string;
  model: string;
  version: string;
  fuel_type: string;
  fuel_efficiency: string;
}

const UserVehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await ky.get('vehicles').json<Vehicle[]>();
        setVehicles(response);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Vehicles</CardTitle>
      </CardHeader>
      <CardContent>
        <GenericTable
          headers={['Year', 'Manufacturer', 'Model', 'Version', 'Fuel Type', 'Fuel Efficiency']}
          data={vehicles}
          dataAccessors={['year', 'manufacturer', 'model', 'version', 'fuel_type', 'fuel_efficiency']}
          renderCell={(item, accessor) => String(item[accessor])}
        />
      </CardContent>
    </Card>
  );
};

export default UserVehicles;
