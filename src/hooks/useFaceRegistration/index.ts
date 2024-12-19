import { useState } from 'react';
import { faceApi } from '../../services/api/faceApi';
import { generateImagePath, createFormData } from './utils';
import type { FaceRegistrationData } from '../../types/face';
import type { UseFaceRegistrationReturn } from './types';

export function useFaceRegistration(): UseFaceRegistrationReturn {
  const [state, setState] = useState({
    loading: false,
    error: null as string | null,
    success: false
  });

  const registerFace = async (data: FaceRegistrationData) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const imagePath = generateImagePath(data.studentCode);
      const formData = createFormData({ ...data, imagePath });
      
      const response = await faceApi.registerFace(formData);

      if (response.success) {
        setState(prev => ({ ...prev, success: true }));
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to register face';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const resetState = () => {
    setState({
      loading: false,
      error: null,
      success: false
    });
  };

  return {
    ...state,
    registerFace,
    resetState
  };
}