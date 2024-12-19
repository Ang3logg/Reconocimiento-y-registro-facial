import React from 'react';
import { Camera, Eye } from 'lucide-react';
import { CameraSelect } from '../../ui/CameraSelect';
import type { VideoDevice } from '../../../hooks/useCamera';

interface FaceRecognitionHeaderProps {
  devices: VideoDevice[];
  currentDevice: string | null;
  onDeviceSelect: (deviceId: string) => void;
  isMonitorOnly?: boolean;
}

export function FaceRecognitionHeader({
  devices,
  currentDevice,
  onDeviceSelect,
  isMonitorOnly = false
}: FaceRecognitionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {isMonitorOnly ? (
          <Eye className="h-6 w-6 text-cyan-500" />
        ) : (
          <Camera className="h-6 w-6 text-cyan-500" />
        )}
        <h2 className="text-xl font-semibold">
          {isMonitorOnly ? 'Face Detection Monitor' : 'Face Recognition Attendance'}
        </h2>
      </div>
      <CameraSelect
        devices={devices}
        currentDevice={currentDevice}
        onDeviceSelect={onDeviceSelect}
        className="w-64"
      />
    </div>
  );
}