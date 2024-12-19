import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';

interface UseVideoSetupProps {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  currentDevice: string | null;
  startCamera: (deviceId: string) => Promise<MediaStream>;
  stopCamera: () => void;
  setError: (error: string | null) => void;
}

export function useVideoSetup({
  videoRef,
  currentDevice,
  startCamera,
  stopCamera,
  setError
}: UseVideoSetupProps) {
  const cleanup = useRef<(() => void) | null>(null);

  useEffect(() => {
    const setupVideo = async () => {
      if (!currentDevice || !videoRef.current) return;

      try {
        const stream = await startCamera(currentDevice);
        if (!videoRef.current) return;

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        cleanup.current = () => {
          stream.getTracks().forEach(track => track.stop());
        };
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to setup video');
      }
    };

    setupVideo();

    return () => {
      if (cleanup.current) {
        cleanup.current();
        cleanup.current = null;
      }
      stopCamera();
    };
  }, [currentDevice, startCamera, stopCamera, setError]);
}