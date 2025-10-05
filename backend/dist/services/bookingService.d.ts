import type { CreateBookingDto, BookingWithDetails } from '../types/type.js';
import type { Booking } from '@prisma/client';
export declare const bookingService: {
    getAll(): Promise<BookingWithDetails[]>;
    create(userId: string, data: CreateBookingDto): Promise<BookingWithDetails>;
    getByUser(userId: string): Promise<BookingWithDetails[]>;
    getById(id: string): Promise<BookingWithDetails>;
    updateStatus(id: string, status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"): Promise<Booking>;
};
//# sourceMappingURL=bookingService.d.ts.map