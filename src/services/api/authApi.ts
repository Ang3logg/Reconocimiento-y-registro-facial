import axios from 'axios';
import type { User } from '../../types/auth';

const API_URL = 'http://localhost/attendance-system/backend/api';

export const authApi = {
  login: async (username: string, password: string) => {
    try {
      const response = await axios.post<{ success: boolean; user: User; error?: string }>(
        `${API_URL}/login.php`,
        { username, password }
      );
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  }
};