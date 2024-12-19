import React, { useRef, useEffect, useState } from 'react';
import { useFaceDetection } from '../../../hooks/useFaceDetection';
import { useAutoAttendance } from '../../../hooks/useFaceDetection/useAutoAttendance';
import { useCamera } from '../../../hooks/useCamera';
import { Card } from '../../ui/Card';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { FaceRecognitionHeader } from './FaceRecognitionHeader';
import { VideoPreview } from './VideoPreview';
import type { FaceDetectionResult } from '../../../types/faceDetection';

interface FaceRecognitionProps {
  onDetection: (result: any) => void;
  isMonitorOnly?: boolean;
}

export default function FaceRecognition({ onDetection, isMonitorOnly = false }: FaceRecognitionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  
  const { 
    isModelLoading, 
    isInitialized,
    error: faceApiError,
    initFaceAPI, 
    startDetection 
  } = useFaceDetection();

  const { processDetection } = useAutoAttendance({
    minConfidence: 0.8, // Higher confidence threshold for attendance
    cooldownPeriod: 300000 // 5 minutes cooldown between detections
  });

  const {
    devices,
    currentDevice,
    error: cameraError,
    loadDevices,
    startCamera,
    stopCamera
  } = useCamera();

  useEffect(() => {
    mountedRef.current = true;
    
    const initialize = async () => {
      try {
        await loadDevices();
        await initFaceAPI();
      } catch (err) {
        if (mountedRef.current) {
          setError('Failed to initialize camera and face detection');
        }
      }
    };

    initialize();

    return () => {
      mountedRef.current = false;
      stopCamera();
    };
  }, [loadDevices, initFaceAPI, stopCamera]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const setupCamera = async () => {
      if (!currentDevice || !videoRef.current || !canvasRef.current || !mountedRef.current) return;

      try {
        const stream = await startCamera(currentDevice);
        if (!mountedRef.current) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await new Promise<void>((resolve, reject) => {
            if (!videoRef.current) return reject();
            videoRef.current.onloadedmetadata = () => resolve();
            videoRef.current.onerror = () => reject();
          });

          if (!mountedRef.current) {
            stream.getTracks().forEach(track => track.stop());
            return;
          }

          await videoRef.current.play();

          if (isInitialized && mountedRef.current) {
            cleanup = startDetection(
              videoRef.current,
              canvasRef.current,
              (result: FaceDetectionResult) => {
                if (!isMonitorOnly) {
                  processDetection(result, onDetection);
                }
              }
            );
          }
        }
      } catch (err) {
        if (mountedRef.current) {
          console.error('Camera setup error:', err);
          setError('Failed to setup camera');
        }
      }
    };

    setupCamera();

    return () => {
      if (cleanup) cleanup();
    };
  }, [currentDevice, isInitialized, startCamera, startDetection, onDetection, processDetection, isMonitorOnly]);

  const displayError = error || cameraError || faceApiError;

  const handleDeviceSelect = async (deviceId: string) => {
    setError(null);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    try {
      await startCamera(deviceId);
    } catch (err) {
      setError('Failed to switch camera');
    }
  };

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
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
            <p className="ml-2 text-gray-600">Loading face detection models...</p>
          </div>
        ) : displayError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-red-500">{displayError}</p>
          </div>
        ) : (
          <VideoPreview videoRef={videoRef} canvasRef={canvasRef} />
        )}
      </div>
      {!isMonitorOnly && (
        <div className="mt-4 text-sm text-gray-500">
          Face detection is active. Attendance will be marked automatically when a face is detected.
        </div>
      )}
    </Card>
  );
}