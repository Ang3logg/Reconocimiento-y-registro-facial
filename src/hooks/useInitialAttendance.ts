import { useEffect } from 'react';
import { AttendanceRecord } from '../types/attendance';

export function useInitialAttendance(setRecords: (records: AttendanceRecord[]) => void) {
  useEffect(() => {
    // Set initial attendance record for Adrian Villantoy
    const initialRecord: AttendanceRecord = {
      id: 1,
      studentCode: '72192900',
      studentName: 'Adrian Villantoy',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      status: 'Present'
    };

    setRecords([initialRecord]);
  }, [setRecords]);
}