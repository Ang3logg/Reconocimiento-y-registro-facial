export interface FaceDetectionState {
  isModelLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

export interface DetectionCleanup {
  stop: () => void;
}