import { useEffect } from 'react';
import type { FaceDetectionResult } from '../../../types/faceDetection';

interface UseCameraSetupProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  currentDevice: string | null;
  isInitialized: boolean;
  startCamera: (deviceId: string) => Promise<MediaStream>;
  startDetection: (
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    onDetection: (result: FaceDetectionResult) => void
  ) => (() => void) | void;
  onDetection: (result: FaceDetectionResult) => void;
}

export function useCameraSetup({
  videoRef,
  canvasRef,
  currentDevice,
  isInitialized,
  startCamera,
  startDetection,
  onDetection
}: UseCameraSetupProps) {
  useEffect(() => {
    let cleanup: (() => void) | void;

    const setupCamera = async () => {
      if (!currentDevice || !videoRef.current || !canvasRef.current) return;

      try {
        const stream = await startCamera(currentDevice);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();

          if (isInitialized) {
            cleanup = startDetection(
              videoRef.current,
              canvasRef.current,
              onDetection
            );
          }
        }
      } catch (err) {
        console.error('Camera setup error:', err);
      }
    };

    setupCamera();

    return () => {
      if (cleanup) cleanup();
    };
  }, [currentDevice, isInitialized, startCamera, startDetection, onDetection]);
}