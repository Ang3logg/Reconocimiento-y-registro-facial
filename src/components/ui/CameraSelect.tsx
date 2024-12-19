import React from 'react';
import { Camera } from 'lucide-react';
import type { VideoDevice } from '../../hooks/useCamera';

interface CameraSelectProps {
  devices: VideoDevice[];
  currentDevice: string | null;
  onDeviceSelect: (deviceId: string) => void;
  className?: string;
}

export function CameraSelect({
  devices,
  currentDevice,
  onDeviceSelect,
  className = ''
}: CameraSelectProps) {
  if (devices.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Camera className="h-5 w-5 text-gray-500" />
      <select
        value={currentDevice || ''}
        onChange={(e) => onDeviceSelect(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
    </div>
  );
}