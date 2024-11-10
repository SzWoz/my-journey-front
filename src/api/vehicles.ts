import { Vehicles } from './schema';
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
