import type { CreateScheduleDto, UpdateScheduleDto, ScheduleWithDetails } from '../types/type.js';
import type { Schedule } from '@prisma/client';
import { prisma } from '../config/db.js';

export const scheduleService = {
  async getAll(): Promise<ScheduleWithDetails[]> {
    return prisma.schedule.findMany({
      where: {
        startTime: { gte: new Date() },
      },
      include: {
        class: true,
        staff: true,
        bookings: true,
      },
      orderBy: { startTime: 'asc' },
    });
  },

  async getByStaff(staffId: string): Promise<ScheduleWithDetails[]> {
    return prisma.schedule.findMany({
      where: { staffId },
      include: {
        class: true,
        staff: true,
        bookings: {
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
          },
        },
      },
      orderBy: { startTime: 'desc' },
    });
  },

  async create(data: CreateScheduleDto): Promise<Schedule> {
    return prisma.schedule.create({
      data,
    });
  },

  async update(id: string, data: UpdateScheduleDto): Promise<Schedule> {
    return prisma.schedule.update({
      where: { id },
      data,
    });
  },

  async delete(id: string): Promise<Schedule> {
    return prisma.schedule.delete({
      where: { id },
    });
  },
};