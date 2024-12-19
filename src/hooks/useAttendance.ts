import { useState, useCallback } from 'react';
import { attendanceApi } from '../services/api/attendanceApi';
import type { AttendanceRecord } from '../types/attendance';

export function useAttendance(userId: number) {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await attendanceApi.getAttendance();
      setRecords(data);
    } catch (err) {
      setError('Failed to load attendance records');
    } finally {
      setLoading(false);
    }
  }, []);

  const addRecord = useCallback(async (data: Partial<AttendanceRecord>) => {
    try {
      await attendanceApi.createAttendance({
        ...data,
        createdBy: userId
      });
      await loadRecords();
    } catch (err) {
      throw new Error('Failed to add attendance record');
    }
  }, [userId, loadRecords]);

  const editRecord = useCallback(async (updatedRecord: AttendanceRecord) => {
    try {
      await attendanceApi.updateAttendance({
        ...updatedRecord,
        userId
      });
      await loadRecords();
    } catch (err) {
      throw new Error('Failed to update attendance record');
    }
  }, [userId, loadRecords]);

  const deleteRecord = useCallback(async (id: number) => {
    try {
      await attendanceApi.deleteAttendance(id, userId);
      await loadRecords();
    } catch (err) {
      throw new Error('Failed to delete attendance record');
    }
  }, [userId, loadRecords]);

  return {
    records,
    setRecords, // Added to allow setting initial records
    loading,
    error,
    loadRecords,
    addRecord,
    editRecord,
    deleteRecord
  };
}