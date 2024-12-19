export interface StudentInfo {
  studentCode: string;
  fullName: string;
  email: string;
}

export interface StudentCardScanResult extends StudentInfo {
  date: string;
  time: string;
  status: 'Present' | 'Absent' | 'Late';
}