import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
      <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
      <p className="text-red-500 text-center mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}