import axiosInstance from './axiosConfig';

export interface PaginationParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
}

export interface Flight {
  flightId: number;
  flightNum: string;
  flightDate: string;
  depTime: string;
  arrTime: string;
  airportDep: string;
  airportArr: string;
  totPass: number;
  totBaggage: number;
  airplaneId: string;
}

export interface Booking {
  achatId: number;
  purchaseDate: string;
  purchaseTime: string;
  price: number;
  employeeid: string;
  clientid: number;
}

export interface Ticket {
  ticketId: string;
  buyId: number;
  clientId: number;
  flightId: number;
  seatNum: string;
}

export interface DashboardResponse<T> {
  [key: string]: any;
  pagination: PaginationInfo;
}

export const getAllFlights = async (params: PaginationParams = {}) => {
  const response = await axiosInstance.get('/dashboard/flights', { params });
  return response.data as DashboardResponse<Flight>;
};

export const getAllBookings = async (params: PaginationParams = {}) => {
  const response = await axiosInstance.get('/dashboard/bookings', { params });
  return response.data as DashboardResponse<Booking>;
};

export const getAllTickets = async (params: PaginationParams = {}) => {
  const response = await axiosInstance.get('/dashboard/tickets', { params });
  return response.data as DashboardResponse<Ticket>;
};

