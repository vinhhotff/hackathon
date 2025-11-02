import axiosInstance from './axiosConfig';

export interface BookingRequest {
  clientId: number;
  flightNum: string;
  flightDate: string;
  passengerCount: number;
}

export interface TicketInfo {
  ticketId: string;
  seatNum: string;
  clientId: number;
}

export interface BookingResponse {
  transactionId: number;
  totalPrice: number;
  clientId: number;
  clientName: string;
  flightNum: string;
  flightDate: string;
  passengerCount: number;
  tickets: TicketInfo[];
}

export const validateBooking = async (request: BookingRequest): Promise<BookingResponse> => {
  const response = await axiosInstance.post('/bookings/validate', request);
  return response.data;
};

export const createBooking = async (request: BookingRequest): Promise<BookingResponse> => {
  const response = await axiosInstance.post('/bookings', request);
  return response.data;
};

