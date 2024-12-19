export interface VideoDevice {
  deviceId: string;
  label: string;
}

export interface CameraError extends Error {
  name: string;
  message: string;
}