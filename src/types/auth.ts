export interface User {
  id: number;
  username: string;
  role: 'admin' | 'user';
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  error?: string;
}