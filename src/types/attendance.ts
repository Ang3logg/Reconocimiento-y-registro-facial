export interface AttendanceRecord {
  id: number;
  studentCode: string;
  studentName: string;
  date: string;
  time: string;
  status: 'Present' | 'Absent' | 'Late';
}