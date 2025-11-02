import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    empId: string;
    firstName: string;
    lastName: string;
    deptId: number;
    email: string;
  };
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  const token = localStorage.getItem('token');
  if (token) {
    await axios.post(`${API_URL}/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

