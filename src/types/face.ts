export interface FaceRegistrationData {
  imageData: string;
  studentCode: string;
  fullName: string;
  email: string;
}

export interface FaceRegistrationResponse {
  success: boolean;
  message?: string;
  error?: string;
  studentId?: number;
  faceId?: string;
}