import ky from 'ky';
import { VehicleData, VehicleMenuItem } from './schema';

const api = ky.create({
  prefixUrl: 'https://www.fueleconomy.gov',
});

const normalizeToArray = <T>(data: T | T[]): T[] => {
  return Array.isArray(data) ? data : [data];
};

export const fetchYears = async (): Promise<VehicleMenuItem[]> => {
  const response = await api.get('ws/rest/vehicle/menu/year').json<{ menuItem: VehicleMenuItem[] | VehicleMenuItem }>();
  return VehicleMenuItem.array().parse(normalizeToArray(response.menuItem));
};

export const fetchMakes = async (year: string): Promise<VehicleMenuItem[]> => {
  const response = await api
    .get(`ws/rest/vehicle/menu/make?year=${year}`)
    .json<{ menuItem: VehicleMenuItem[] | VehicleMenuItem }>();
  return VehicleMenuItem.array().parse(normalizeToArray(response.menuItem));
};

export const fetchModels = async (year: string, make: string): Promise<VehicleMenuItem[]> => {
  const response = await api
    .get(`ws/rest/vehicle/menu/model?year=${year}&make=${make}`)
    .json<{ menuItem: VehicleMenuItem[] | VehicleMenuItem }>();
  return VehicleMenuItem.array().parse(normalizeToArray(response.menuItem));
};

export const fetchOptions = async (year: string, make: string, model: string): Promise<VehicleMenuItem[]> => {
  const response = await api
    .get(`ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`)
    .json<{ menuItem: VehicleMenuItem[] | VehicleMenuItem }>();
  return VehicleMenuItem.array().parse(normalizeToArray(response.menuItem));
};

export const fetchVehicleData = async (vehicleId: string): Promise<VehicleData> => {
  const response = await api.get(`ws/rest/ympg/shared/ympgVehicle/${vehicleId}`).json<VehicleData>();
  return response;
};
