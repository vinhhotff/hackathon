import axiosInstance from './axiosConfig';

export interface TicketSearchParams {
  ticketId?: string;
  clientId?: number;
  firstName?: string;
  lastName?: string;
  flightNum?: string;
  flightDate?: string;
  page?: number;
  size?: number;
}

export interface Ticket {
  ticketId: string;
  seatNum: string;
  firstName: string;
  lastName: string;
  clientId: number;
  flightDate: string;
  depTime: string;
  arrTime: string;
  flightNum: string;
  airportDep: string;
  airportArr: string;
}

export interface TicketSearchResponse {
  tickets: Ticket[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
  };
}

export const searchTickets = async (params: TicketSearchParams): Promise<TicketSearchResponse> => {
  const response = await axiosInstance.get('/tickets', {
    params
  });
  return response.data;
};

export const getTicketById = async (ticketId: string): Promise<Ticket> => {
  const response = await axiosInstance.get(`/tickets/${ticketId}`);
  return response.data;
};

