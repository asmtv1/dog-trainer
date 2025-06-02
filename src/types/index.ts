export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'trainer';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  trainerId: string;
  price: number;
  duration: number;
}

export interface Training {
  id: string;
  courseId: string;
  userId: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
} 