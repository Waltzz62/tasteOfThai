import type { CreateStaffApplicationDto, UpdateStaffApplicationDto, StaffApplicationWithUser } from '../types/type.js';
import { prisma } from '../config/db.js';

export const staffApplicationService = {
  async create(userId: string, data: CreateStaffApplicationDto): Promise<StaffApplicationWithUser> {
    const existing = await prisma.staffApplication.findUnique({
      where: { userId },
    });

    if (existing) {
      throw new Error('You have already applied');
    }

    const application = await prisma.staffApplication.create({
      data: {
        userId,
        ...data,
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
      },
    });

    return application;
  },

  async getAll(): Promise<StaffApplicationWithUser[]> {
    return prisma.staffApplication.findMany({
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
      orderBy: { createdAt: 'desc' },
    });
  },

  async getById(id: string): Promise<StaffApplicationWithUser> {
    const application = await prisma.staffApplication.findUnique({
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
      },
    });

    if (!application) {
      throw new Error('Application not found');
    }

    return application;
  },

  async update(id: string, data: UpdateStaffApplicationDto): Promise<StaffApplicationWithUser> {
    const updateData: any = { ...data };
    
    if (data.status) {
      updateData.reviewedAt = new Date();
    }

    const application = await prisma.staffApplication.update({
      where: { id },
      data: updateData,
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
    });

    return application;
  },
};