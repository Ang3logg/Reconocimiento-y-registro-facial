import axios from 'axios';

const API_URL = 'http://localhost/attendance-system/backend/api';

export const api = {
  login: async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/login.php`, {
      username,
      password
    });
    return response.data;
  },

  getAttendance: async () => {
    const response = await axios.get(`${API_URL}/attendance.php`);
    return response.data;
  },

  createAttendance: async (data: any) => {
    const response = await axios.post(`${API_URL}/attendance.php`, data);
    return response.data;
  },

  updateAttendance: async (data: any) => {
    const response = await axios.put(`${API_URL}/attendance.php`, data);
    return response.data;
  },

  deleteAttendance: async (id: number) => {
    const response = await axios.delete(`${API_URL}/attendance.php?id=${id}`);
    return response.data;
  }
};