import { useState, useCallback, useRef } from 'react';

export interface VideoDevice {
  deviceId: string;
  label: string;
}

export function useCamera() {
  const [devices, setDevices] = useState<VideoDevice[]>([]);
  const [currentDevice, setCurrentDevice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const loadDevices = useCallback(async () => {
    try {
      const initialStream = await navigator.mediaDevices.getUserMedia({ video: true });
      initialStream.getTracks().forEach(track => track.stop());
      
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices
        .filter(device => device.kind === 'videoinput')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${devices.indexOf(device) + 1}`
        }));
      
      setDevices(videoDevices);
      if (videoDevices.length > 0 && !currentDevice) {
        setCurrentDevice(videoDevices[0].deviceId);
      }
      setError(null);
    } catch (error) {
      console.error('Error loading camera devices:', error);
      setError('Failed to load camera devices');
      throw error;
    }
  }, [currentDevice]);

  const startCamera = useCallback(async (deviceId: string) => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: deviceId },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      streamRef.current = newStream;
      setCurrentDevice(deviceId);
      setError(null);
      return newStream;
    } catch (error) {
      console.error('Error starting camera:', error);
      setError('Failed to start camera');
      throw error;
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  return {
    devices,
    currentDevice,
    error,
    loadDevices,
    startCamera,
    stopCamera
  };
}