import React, { useRef, useEffect, useState } from 'react';
import { Camera, X } from 'lucide-react';
import { useCamera } from '../../hooks/useCamera';
import { CameraSelect } from '../ui/CameraSelect';

interface FaceCaptureProps {
  onCapture: (imageData: string) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function FaceCapture({ onCapture, onCancel, loading }: FaceCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  
  const {
    devices,
    currentDevice,
    loadDevices,
    startCamera,
    stopCamera
  } = useCamera();

  // Initialize camera when component mounts
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        await loadDevices();
        if (devices.length > 0 && devices[0].deviceId) {
          const stream = await startCamera(devices[0].deviceId);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
          }
        }
      } catch (err) {
        setError('Failed to initialize camera');
        console.error('Camera initialization error:', err);
      }
    };

    initializeCamera();

    return () => {
      stopCamera();
    };
  }, [loadDevices, startCamera, stopCamera]);

  // Handle device selection
  const handleDeviceSelect = async (deviceId: string) => {
    try {
      setError(null);
      const stream = await startCamera(deviceId);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      setError('Failed to start camera');
      console.error('Camera switch error:', err);
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64
    const imageData = canvas.toDataURL('image/jpeg');
    onCapture(imageData);
  };

  return (
    <div className="relative">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4">
        <CameraSelect
          devices={devices}
          currentDevice={currentDevice}
          onDeviceSelect={handleDeviceSelect}
        />
      </div>

      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          disabled={loading}
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
        <button
          onClick={captureImage}
          className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
          disabled={loading}
        >
          <Camera className="h-4 w-4" />
          Capture
        </button>
      </div>
    </div>
  );
}