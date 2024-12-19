import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center gap-2">
      <AlertCircle className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
}