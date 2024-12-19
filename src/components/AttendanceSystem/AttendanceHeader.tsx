import React from 'react';
import { Users, LogOut } from 'lucide-react';

interface AttendanceHeaderProps {
  isAdmin: boolean;
}

export default function AttendanceHeader({ isAdmin }: AttendanceHeaderProps) {
  return (
    <header className="bg-white shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-cyan-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              {isAdmin ? 'Attendance Management System' : 'Attendance System'}
            </h1>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}