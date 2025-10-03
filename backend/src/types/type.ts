import type { Request } from 'express';
import type { 
  User, 
  Staff, 
  Class, 
  Schedule, 
  Booking, 
  Payment,
  StaffApplication,
  Role,
  BookingStatus,
  PaymentStatus,
  ApplicationStatus
} from '@prisma/client';

// ============================================
// AUTH TYPES
// ============================================

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: Role;
  };
}

export type UserWithoutPassword = Omit<User, 'password'>;
export type StaffWithoutPassword = Omit<Staff, 'password'>;

// ============================================
// CLASS TYPES
// ============================================

export interface CreateClassDto {
  title: string;
  description: string;
  duration: number;
  price: number;
  maxStudents: number;
  image?: string;
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

export interface UpdateClassDto extends Partial<CreateClassDto> {
  active?: boolean;
}

export interface ClassWithSchedules extends Class {
  schedules: Schedule[];
}

export interface ClassFilters {
  page?: number;
  limit?: number;
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  minPrice?: number;
  maxPrice?: number;
  active?: boolean;
}

// ============================================
// SCHEDULE TYPES
// ============================================

export interface CreateScheduleDto {
  classId: string;
  staffId?: string;
  startTime: Date;
  endTime: Date;
  maxStudents: number;
}

export interface UpdateScheduleDto extends Partial<CreateScheduleDto> {
  status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

export interface ScheduleWithDetails extends Schedule {
  class: Class;
  staff?: StaffWithoutPassword | null;
  bookings: Booking[];
}

// ============================================
// BOOKING TYPES
// ============================================

export interface CreateBookingDto {
  scheduleId: string;
  numberOfPeople: number;
  notes?: string | null ;
}

export interface BookingWithDetails extends Booking {
  user: UserWithoutPassword;
  schedule: ScheduleWithDetails;
  payment?: Payment | null;
}

// ============================================
// STAFF TYPES
// ============================================

export interface CreateStaffDto {
  email: string;
  password: string;
  name: string;
  phone: string;
  bio?: string;
  specialties?: string[];
  image?: string;
}

export interface UpdateStaffDto {
  name?: string;
  phone?: string;
  bio?: string;
  specialties?: string[];
  image?: string;
  active?: boolean;
}

// ============================================
// STAFF APPLICATION TYPES
// ============================================

export interface CreateStaffApplicationDto {
  fullName: string;
  phone: string;
  email: string;
  experience: string;
  skills: string[];
}

export interface UpdateStaffApplicationDto {
  status?: ApplicationStatus;
  reviewNote?: string;
  reviewedBy?: string;
}

export interface StaffApplicationWithUser extends StaffApplication {
  user: UserWithoutPassword;
}

// ============================================
// PAYMENT TYPES
// ============================================

export interface CreatePaymentDto {
  bookingId: string;
  amount: number;
  paymentMethod?: string;
}

export interface UpdatePaymentDto {
  status?: PaymentStatus;
  paidAt?: Date;
}

// ============================================
// PAGINATION TYPES
// ============================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
  statusCode: number;
}