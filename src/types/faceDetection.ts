import * as faceapi from 'face-api.js';

export interface FaceDetectionResult {
  timestamp: Date;
  detections: faceapi.WithFaceLandmarks<WithFaceDetection<{}>>[];
}

export interface FaceDetectionState {
  isModelLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}