import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GenericTable from '@/components/generic-table';
import { vehiclesQueryOptions } from '@/queries/vehicles';
import { useQuery } from '@tanstack/react-query';

const UserVehicles: React.FC = () => {
  const { data: vehicleData } = useQuery(vehiclesQueryOptions);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>My Vehicles</CardTitle>
      </CardHeader>
      <CardContent>
        <GenericTable
          headers={['Year', 'Manufacturer', 'Model', 'Version', 'Fuel Type', 'Efficiency (l/100km)']}
          data={vehicleData || []}
          dataAccessors={['year', 'manufacturer', 'model', 'version', 'fuel_type', 'fuel_efficiency']}
          renderCell={(item, accessor) => String(item[accessor])}
        />
      </CardContent>
    </Card>
  );
};

export default UserVehicles;
