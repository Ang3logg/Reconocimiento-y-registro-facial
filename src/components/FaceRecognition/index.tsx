import React, { useRef, useState, useEffect } from 'react';
import { useFaceDetection } from '../../hooks/useFaceDetection';
import { useAutoAttendance } from '../../hooks/useFaceDetection/useAutoAttendance';
import { useCamera } from '../../hooks/useCamera';
import { Card } from '../ui/Card';
import { FaceRecognitionHeader } from './FaceRecognitionHeader';
import { VideoPreview } from './VideoPreview';
import { ErrorDisplay } from './components/ErrorDisplay';
import { LoadingDisplay } from './components/LoadingDisplay';
import type { FaceDetectionResult } from '../../types/faceDetection';

interface FaceRecognitionProps {
  onDetection: (result: FaceDetectionResult) => void;
  isMonitorOnly?: boolean;
}

export default function FaceRecognition({ onDetection, isMonitorOnly = false }: FaceRecognitionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    isModelLoading, 
    isInitialized,
    error: faceApiError,
    initFaceAPI, 
    startDetection 
  } = useFaceDetection();

  const { processDetection } = useAutoAttendance({
    minConfidence: 0.8,
    cooldownPeriod: 300000
  });

  const {
    devices,
    currentDevice,
    error: cameraError,
    loadDevices,
    startCamera,
    stopCamera
  } = useCamera(true); // Set autoStart to true

  useEffect(() => {
    const setupVideo = async () => {
      if (!currentDevice || !videoRef.current) return;

      try {
        const stream = await startCamera(currentDevice);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to setup video');
      }
    };

    if (currentDevice) {
      setupVideo();
    }

    return () => {
      stopCamera();
    };
  }, [currentDevice, startCamera, stopCamera]);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initFaceAPI();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize system');
      }
    };

    initialize();
  }, [initFaceAPI]);

  const handleDeviceSelect = async (deviceId: string) => {
    setError(null);
    try {
      await startCamera(deviceId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to switch camera');
    }
  };

  const handleRetry = async () => {
    setError(null);
    try {
      await loadDevices();
      await initFaceAPI();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize');
    }
  };

  const displayError = error || cameraError || faceApiError;

  return (
    <Card className="p-6">
      <FaceRecognitionHeader
        devices={devices}
        currentDevice={currentDevice}
        onDeviceSelect={handleDeviceSelect}
        isMonitorOnly={isMonitorOnly}
      />
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {isModelLoading ? (
          <LoadingDisplay />
        ) : displayError ? (
          <ErrorDisplay error={displayError} onRetry={handleRetry} />
        ) : (
          <VideoPreview videoRef={videoRef} canvasRef={canvasRef} />
        )}
      </div>
      {!isMonitorOnly && !displayError && (
        <div className="mt-4 text-sm text-gray-500">
          Face detection is active. Attendance will be marked automatically when a face is detected.
        </div>
      )}
    </Card>
  );
}