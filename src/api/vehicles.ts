import { Vehicle, Vehicles } from './schema';
import ky from './utils/ky';

export const fetchVehicles = async () => {
  try {
    const response = await ky.get('vehicles').json();
    return Vehicles.parse(response);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};

export const addVehicle = async (vehicle: Omit<Vehicle, 'id'>) => {
  const response = await ky.post('vehicles', {
    json: vehicle,
  });

  if (!response.ok) {
    throw new Error('Failed to add vehicle');
  }

  return response.json();
};
