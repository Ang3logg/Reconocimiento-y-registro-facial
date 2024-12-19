import React, { useRef, useEffect, useState } from 'react';
import { useFaceDetection } from '../../hooks/useFaceDetection';
import { useCamera } from '../../hooks/useCamera';
import { Card } from '../ui/Card';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { CameraSelect } from '../ui/CameraSelect';
import { Camera } from 'lucide-react';

interface FaceRecognitionProps {
  onDetection: (data: any) => void;
}

export default function FaceRecognition({ onDetection }: FaceRecognitionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { initFaceAPI, startDetection, isModelLoading, isInitialized } = useFaceDetection();
  const { devices, currentDevice, loadDevices, startCamera, stopCamera } = useCamera();

  useEffect(() => {
    const initializeDevices = async () => {
      try {
        await loadDevices();
      } catch (err) {
        setError('Failed to load camera devices. Please ensure camera permissions are granted.');
      }
    };

    initializeDevices();
    return () => stopCamera();
  }, [loadDevices, stopCamera]);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initFaceAPI();
      } catch (err) {
        setError('Failed to initialize face detection.');
      }
    };

    initialize();
  }, [initFaceAPI]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const setupCamera = async () => {
      if (!currentDevice || !videoRef.current || !canvasRef.current) return;

      try {
        const stream = await startCamera(currentDevice);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();

          // Set canvas dimensions to match video
          const { videoWidth, videoHeight } = videoRef.current;
          if (canvasRef.current) {
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
          }

          if (isInitialized) {
            cleanup = startDetection(videoRef.current, canvasRef.current, onDetection);
          }
        }
      } catch (err) {
        setError('Failed to start camera stream.');
        console.error('Camera setup error:', err);
      }
    };

    setupCamera();

    return () => {
      if (cleanup) cleanup();
    };
  }, [currentDevice, isInitialized, startCamera, startDetection, onDetection]);

  const handleDeviceSelect = (deviceId: string) => {
    setError(null);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    startCamera(deviceId).catch(err => {
      setError('Failed to switch camera.');
      console.error('Camera switch error:', err);
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Camera className="h-6 w-6 text-cyan-500" />
          <h2 className="text-xl font-semibold">Face Recognition</h2>
        </div>
        <CameraSelect
          devices={devices}
          currentDevice={currentDevice}
          onDeviceSelect={handleDeviceSelect}
          className="w-64"
        />
      </div>
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {isModelLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
            <p className="ml-2 text-gray-600">Loading face detection models...</p>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
          </>
        )}
      </div>
    </Card>
  );
}