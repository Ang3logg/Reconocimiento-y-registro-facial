import { useCallback, useEffect, useRef } from 'react';
import { useStreamManager } from './useStreamManager';
import { useDeviceManager } from './useDeviceManager';
import { getVideoStream } from './utils';
import type { VideoDevice } from './types';

export function useCamera(autoStart: boolean = true) {
  const { devices, currentDevice, setCurrentDevice, updateDevices } = useDeviceManager();
  const { setStream, stopStream } = useStreamManager();
  const [error, setError] = useState<string | null>(null);
  const isInitializedRef = useRef(false);

  const startCamera = useCallback(async (deviceId: string) => {
    try {
      setError(null);
      const stream = await getVideoStream(deviceId);
      setStream(stream);
      setCurrentDevice(deviceId);
      return stream;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start camera';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [setStream, setCurrentDevice]);

  const loadDevices = useCallback(async () => {
    try {
      // Request initial camera access
      const initialStream = await navigator.mediaDevices.getUserMedia({ video: true });
      initialStream.getTracks().forEach(track => track.stop());

      const videoDevices = await updateDevices();
      
      if (autoStart && videoDevices.length > 0 && !isInitializedRef.current) {
        await startCamera(videoDevices[0].deviceId);
        isInitializedRef.current = true;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load camera devices';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [updateDevices, startCamera, autoStart]);

  // Initialize camera on mount if autoStart is true
  useEffect(() => {
    if (autoStart && !isInitializedRef.current) {
      loadDevices();
    }

    return () => {
      stopStream();
      isInitializedRef.current = false;
    };
  }, [autoStart, loadDevices, stopStream]);

  return {
    devices,
    currentDevice,
    error,
    loadDevices,
    startCamera,
    stopCamera: stopStream
  };
}

export type { VideoDevice } from './types';