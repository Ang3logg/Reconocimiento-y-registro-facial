import type { FaceRegistrationData, FaceRegistrationResponse } from '../../types/face';

export interface UseFaceRegistrationState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface UseFaceRegistrationReturn extends UseFaceRegistrationState {
  registerFace: (data: FaceRegistrationData) => Promise<void>;
  resetState: () => void;
}