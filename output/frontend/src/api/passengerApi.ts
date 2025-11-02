import axiosInstance from './axiosConfig';

export interface Passenger {
  clientId: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  telephone: string;
  email: string;
}

export interface PassengerRequest {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  telephone: string;
  email: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
}

export interface PassengerListResponse {
  passengers: Passenger[];
  pagination: PaginationInfo;
}

export const getAllPassengers = async (page: number = 0, size: number = 10, search?: string): Promise<PassengerListResponse> => {
  const params: any = { page, size };
  if (search) params.search = search;
  const response = await axiosInstance.get('/passengers', { params });
  return response.data;
};

export const getPassengerById = async (clientId: number): Promise<Passenger> => {
  const response = await axiosInstance.get(`/passengers/${clientId}`);
  return response.data;
};

export const createPassenger = async (data: PassengerRequest): Promise<Passenger> => {
  const response = await axiosInstance.post('/passengers', data);
  return response.data;
};

export const updatePassenger = async (clientId: number, data: PassengerRequest): Promise<Passenger> => {
  const response = await axiosInstance.put(`/passengers/${clientId}`, data);
  return response.data;
};

export const deletePassenger = async (clientId: number): Promise<void> => {
  await axiosInstance.delete(`/passengers/${clientId}`);
};

