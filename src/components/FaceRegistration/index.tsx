import React, { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { FaceCapture } from './FaceCapture';
import { RegistrationForm } from './RegistrationForm';
import { SuccessMessage } from './components/SuccessMessage';
import { ErrorMessage } from './components/ErrorMessage';
import { useFaceRegistration } from '../../hooks/useFaceRegistration';
import type { FaceRegistrationData } from '../../types/face';

interface FaceRegistrationProps {
  onSuccess?: () => void;
}

export default function FaceRegistration({ onSuccess }: FaceRegistrationProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const { loading, error, success, registerFace, resetState } = useFaceRegistration();
  const [formData, setFormData] = useState<Omit<FaceRegistrationData, 'imageData'>>({
    studentCode: '',
    fullName: '',
    email: ''
  });

  const handleCapture = async (imageData: string) => {
    try {
      await registerFace({
        imageData,
        ...formData
      });
      setIsCapturing(false);
      onSuccess?.();
    } catch (err) {
      console.error('Face registration failed:', err);
    }
  };

  const handleReset = () => {
    resetState();
    setFormData({
      studentCode: '',
      fullName: '',
      email: ''
    });
  };

  if (success) {
    return (
      <Card className="p-6 max-w-md mx-auto">
        <SuccessMessage onReset={handleReset} />
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Camera className="h-6 w-6 text-cyan-500" />
        <h2 className="text-xl font-semibold">Registro de Rostro</h2>
      </div>

      {error && <ErrorMessage message={error} />}

      {!isCapturing ? (
        <RegistrationForm
          formData={formData}
          onChange={setFormData}
          onSubmit={() => setIsCapturing(true)}
          loading={loading}
        />
      ) : (
        <FaceCapture
          onCapture={handleCapture}
          onCancel={() => setIsCapturing(false)}
          loading={loading}
        />
      )}

      {loading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-cyan-500 animate-spin" />
        </div>
      )}
    </Card>
  );
}