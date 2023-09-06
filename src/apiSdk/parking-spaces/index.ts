import axios from 'axios';
import queryString from 'query-string';
import { ParkingSpaceInterface, ParkingSpaceGetQueryInterface } from 'interfaces/parking-space';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getParkingSpaces = async (
  query?: ParkingSpaceGetQueryInterface,
): Promise<PaginatedInterface<ParkingSpaceInterface>> => {
  const response = await axios.get('/api/parking-spaces', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createParkingSpace = async (parkingSpace: ParkingSpaceInterface) => {
  const response = await axios.post('/api/parking-spaces', parkingSpace);
  return response.data;
};

export const updateParkingSpaceById = async (id: string, parkingSpace: ParkingSpaceInterface) => {
  const response = await axios.put(`/api/parking-spaces/${id}`, parkingSpace);
  return response.data;
};

export const getParkingSpaceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/parking-spaces/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteParkingSpaceById = async (id: string) => {
  const response = await axios.delete(`/api/parking-spaces/${id}`);
  return response.data;
};
