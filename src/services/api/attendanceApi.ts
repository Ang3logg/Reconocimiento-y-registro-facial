import axios from 'axios';
import type { AttendanceRecord } from '../../types/attendance';

const API_URL = 'http://localhost/attendance-system/backend/api';

export const attendanceApi = {
  getAttendance: async () => {
    try {
      const response = await axios.get<AttendanceRecord[]>(`${API_URL}/attendance.php`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch attendance records:', error);
      throw new Error('Failed to fetch attendance records');
    }
  },

  createAttendance: async (data: Partial<AttendanceRecord>) => {
    try {
      const response = await axios.post(`${API_URL}/attendance.php`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to create attendance record:', error);
      throw new Error('Failed to create attendance record');
    }
  },

  updateAttendance: async (data: AttendanceRecord & { userId: number }) => {
    try {
      const response = await axios.put(`${API_URL}/attendance.php`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update attendance record:', error);
      throw new Error('Failed to update attendance record');
    }
  },

  deleteAttendance: async (id: number, userId: number) => {
    try {
      const response = await axios.delete(`${API_URL}/attendance.php?id=${id}&userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete attendance record:', error);
      throw new Error('Failed to delete attendance record');
    }
  }
};