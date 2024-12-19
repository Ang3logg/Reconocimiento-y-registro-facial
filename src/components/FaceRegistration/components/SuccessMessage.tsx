import React from 'react';
import { UserPlus } from 'lucide-react';

interface SuccessMessageProps {
  onReset: () => void;
}

export function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <div className="text-center">
      <div className="h-12 w-12 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
        <UserPlus className="h-6 w-6 text-green-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">¡Registro Exitoso!</h2>
      <p className="text-gray-600">
        Tu rostro ha sido registrado exitosamente. Ahora puedes usar el reconocimiento facial para marcar asistencia.
      </p>
      <button
        onClick={onReset}
        className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
      >
        Registrar Otro Rostro
      </button>
    </div>
  );
}