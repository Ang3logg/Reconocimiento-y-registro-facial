import React from 'react';
import { UserPlus } from 'lucide-react';

interface RegistrationFormProps {
  formData: {
    studentCode: string;
    fullName: string;
    email: string;
  };
  onChange: (data: { studentCode: string; fullName: string; email: string }) => void;
  onSubmit: () => void;
  loading?: boolean;
}

export function RegistrationForm({ formData, onChange, onSubmit, loading }: RegistrationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="studentCode" className="block text-sm font-medium text-gray-700">
          Student Code
        </label>
        <input
          type="text"
          id="studentCode"
          value={formData.studentCode}
          onChange={(e) => onChange({ ...formData, studentCode: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={formData.fullName}
          onChange={(e) => onChange({ ...formData, fullName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => onChange({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
        disabled={loading}
      >
        <UserPlus className="h-4 w-4" />
        Continue to Face Registration
      </button>
    </form>
  );
}