import React, { useState, useRef } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import { Card } from '../../ui/Card';
import { extractStudentInfo } from '../../../utils/imageProcessing';
import type { StudentCardScanResult } from '../../../types/student';

interface StudentCardScannerProps {
  onScan: (result: StudentCardScanResult) => void;
}

export default function StudentCardScanner({ onScan }: StudentCardScannerProps) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setProcessing(true);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Process image
      const imageData = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });

      const studentInfo = await extractStudentInfo(imageData);
      
      if (!studentInfo) {
        throw new Error('No se pudo extraer la información del estudiante');
      }

      onScan({
        ...studentInfo,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        status: 'Present'
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la imagen');
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Camera className="h-6 w-6 text-cyan-500" />
          <h2 className="text-xl font-semibold">Escaneo de Carné</h2>
        </div>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full h-auto rounded-md"
              />
              <button
                onClick={handleReset}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md font-medium text-cyan-600 hover:text-cyan-500"
                >
                  <span>Subir imagen del carné</span>
                  <input
                    id="file-upload"
                    ref={fileInputRef}
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={processing}
                  />
                </label>
                <p className="text-sm text-gray-500">PNG, JPG hasta 5MB</p>
              </div>
            </div>
          )}
        </div>

        {processing && (
          <div className="text-center text-sm text-gray-500">
            Procesando imagen...
          </div>
        )}
      </div>
    </Card>
  );
}