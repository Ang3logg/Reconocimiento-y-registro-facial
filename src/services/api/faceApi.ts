import axios from 'axios';
import type { FaceRegistrationResponse } from '../../types/face';

const API_URL = 'http://localhost/attendance-system/backend/api';

export const faceApi = {
  registerFace: async (formData: FormData): Promise<FaceRegistrationResponse> => {
    try {
      const response = await axios.post(
        `${API_URL}/register_face.php`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to register face:', error);
      throw new Error('Failed to register face');
    }
  }
};