import { useState } from 'react';
import { faceApi } from '../../../services/api/faceApi';
import type { FaceRegistrationData } from '../../../types/face';

export function useFaceRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const registerFace = async (data: FaceRegistrationData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await faceApi.registerFace(data);

      if (response.success) {
        setSuccess(true);
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register face');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    registerFace,
    resetState: () => {
      setError(null);
      setSuccess(false);
    }
  };
}