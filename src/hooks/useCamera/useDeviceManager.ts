import { useState, useCallback } from 'react';
import type { VideoDevice } from './types';

export function useDeviceManager() {
  const [devices, setDevices] = useState<VideoDevice[]>([]);
  const [currentDevice, setCurrentDevice] = useState<string | null>(null);

  const updateDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices
        .filter(device => device.kind === 'videoinput')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${devices.indexOf(device) + 1}`
        }));

      setDevices(videoDevices);
      
      // Set first device as current if none selected
      if (videoDevices.length > 0 && !currentDevice) {
        setCurrentDevice(videoDevices[0].deviceId);
      }

      return videoDevices;
    } catch (error) {
      console.error('Failed to enumerate devices:', error);
      throw new Error('Failed to load camera devices');
    }
  }, [currentDevice]);

  return {
    devices,
    currentDevice,
    setCurrentDevice,
    updateDevices
  };
}