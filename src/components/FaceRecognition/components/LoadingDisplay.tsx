import React from 'react';
import { LoadingSpinner } from '../../ui/LoadingSpinner';

export function LoadingDisplay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <LoadingSpinner />
      <p className="ml-2 text-gray-600">Loading face detection models...</p>
    </div>
  );
}