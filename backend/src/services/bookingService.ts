import type { CreateBookingDto, BookingWithDetails } from '../types/type.js';
import type { Booking } from '@prisma/client';
import { prisma } from '../config/db.js';

export const bookingService = {
  async getAll(): Promise<BookingWithDetails[]> {
    return prisma.booking.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            role: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        schedule: {
          include: {
            class: true,
            staff: true,
            bookings: true,
          },
        },
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async create(userId: string, data: CreateBookingDto): Promise<BookingWithDetails> {
    const schedule = await prisma.schedule.findUnique({
      where: { id: data.scheduleId },
      include: { class: true },
    });

    if (!schedule) {
      throw new Error('Schedule not found');
    }

    if (schedule.bookedCount + data.numberOfPeople > schedule.maxStudents) {
      throw new Error('Not enough seats available');
    }

    const totalPrice = schedule.class.price * data.numberOfPeople;

    const booking = await prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          userId,
          scheduleId: data.scheduleId,
          numberOfPeople: data.numberOfPeople,
          totalPrice,
          notes: data.notes ?? null,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              phone: true,
              role: true,
              image: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          schedule: {
            include: {
              class: true,
              staff: true,
              bookings: true,
            },
          },
          payment: true,
        },
      });

      await tx.schedule.update({
        where: { id: data.scheduleId },
        data: {
          bookedCount: { increment: data.numberOfPeople },
        },
      });

      return newBooking;
    });

    return booking;
  },

  async getByUser(userId: string): Promise<BookingWithDetails[]> {
    return prisma.booking.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            role: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        schedule: {
          include: {
            class: true,
            staff: true,
            bookings: true,
          },
        },
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getById(id: string): Promise<BookingWithDetails> {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            role: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        schedule: {
          include: {
            class: true,
            staff: true,
            bookings: true,
          },
        },
        payment: true,
      },
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    return booking;
  },

  async updateStatus(id: string, status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'): Promise<Booking> {
    return prisma.booking.update({
      where: { id },
      data: { status },
    });
  },
};