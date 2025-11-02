import axiosInstance from './axiosConfig';

export interface FlightSearchParams {
  flightNum?: string;
  flightDate?: string;
  airportDep?: string;
  airportArr?: string;
  page?: number;
  size?: number;
}

export interface Flight {
  flightId: number;
  flightNum: string;
  flightDate: string;
  depTime: string;
  arrTime: string;
  airportDep: string;
  airportArr: string;
  availableSeats: number;
}

export interface FlightSearchResponse {
  flights: Flight[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
  };
}

export const searchFlights = async (params: FlightSearchParams): Promise<FlightSearchResponse> => {
  const response = await axiosInstance.get('/flights', {
    params
  });
  return response.data;
};

