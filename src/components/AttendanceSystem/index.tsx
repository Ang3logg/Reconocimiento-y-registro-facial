import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AttendanceHeader from './AttendanceHeader';
import FaceRecognition from './FaceRecognition';
import QRScanner from './QRScanner';
import AttendanceTable from './AttendanceTable';
import FaceRegistration from '../FaceRegistration';
import { SearchBar } from './SearchBar';
import { useAttendance } from '../../hooks/useAttendance';
import { useInitialAttendance } from '../../hooks/useInitialAttendance';

interface AttendanceSystemProps {
  isAdmin: boolean;
  userId: number;
}

export default function AttendanceSystem({ isAdmin, userId }: AttendanceSystemProps) {
  const navigate = useNavigate();
  const { records, setRecords, addRecord, editRecord, deleteRecord } = useAttendance(userId);
  const [showRegistration, setShowRegistration] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize with Adrian's attendance
  useInitialAttendance(setRecords);

  const filteredRecords = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return records.filter(record => 
      record.studentName.toLowerCase().includes(query) ||
      record.studentCode.toLowerCase().includes(query)
    );
  }, [records, searchQuery]);

  const handleDetection = async (data: any) => {
    if (!isAdmin) {
      try {
        await addRecord({
          ...data,
          detectionMethod: 'Face',
          createdBy: userId,
          status: 'Present',
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString()
        });
      } catch (error) {
        console.error('Failed to record attendance:', error);
      }
    }
  };

  const handleQRScan = async (data: any) => {
    if (!isAdmin) {
      try {
        await addRecord({
          ...data,
          detectionMethod: 'QR',
          createdBy: userId
        });
      } catch (error) {
        console.error('Failed to record attendance:', error);
      }
    }
  };

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <AttendanceHeader isAdmin={isAdmin} />
      <div className="max-w-7xl mx-auto space-y-6">
        {!showRegistration ? (
          <>
            {isAdmin ? (
              <div className="grid grid-cols-1 gap-6">
                <FaceRecognition 
                  onDetection={handleDetection}
                  isMonitorOnly={true}
                />
              </div>
            ) : (
              <>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowRegistration(true)}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
                  >
                    Registrar Nuevo Rostro
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FaceRecognition 
                    onDetection={handleDetection}
                    isMonitorOnly={false}
                  />
                  <QRScanner onScan={handleQRScan} />
                </div>
              </>
            )}
            <SearchBar onSearch={setSearchQuery} />
            <AttendanceTable
              records={filteredRecords}
              isAdmin={isAdmin}
              onEdit={editRecord}
              onDelete={deleteRecord}
            />
          </>
        ) : (
          <div className="mb-6">
            <FaceRegistration onSuccess={handleRegistrationSuccess} />
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowRegistration(false)}
                className="text-cyan-600 hover:text-cyan-700"
              >
                Volver a Asistencia
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}