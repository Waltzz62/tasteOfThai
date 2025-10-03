import type { CreateClassDto, UpdateClassDto, ClassFilters, PaginatedResponse, ClassWithSchedules } from '../types/type.js';
import type { Class, Prisma } from '@prisma/client';
import { prisma } from '../config/db.js';

export const classService = {
  async getAll(filters?: ClassFilters): Promise<PaginatedResponse<ClassWithSchedules>> {
    const { 
      page = 1, 
      limit = 10, 
      difficulty, 
      minPrice, 
      maxPrice, 
      active = true 
    } = filters || {};
    
    const where: Prisma.ClassWhereInput = { active };
    
    if (difficulty) where.difficulty = difficulty;
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    const skip = (page - 1) * limit;

    const [total, classes] = await Promise.all([
      prisma.class.count({ where }),
      prisma.class.findMany({
        where,
        skip,
        take: limit,
        include: {
          schedules: {
            where: {
              startTime: { gte: new Date() },
              status: 'SCHEDULED',
            },
            orderBy: { startTime: 'asc' },
            take: 5,
          },
        },
      }),
    ]);

    return {
      data: classes,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: string): Promise<ClassWithSchedules> {
    const classData = await prisma.class.findUnique({
      where: { id },
      include: {
        schedules: {
          where: { startTime: { gte: new Date() } },
          include: { staff: true },
          orderBy: { startTime: 'asc' },
        },
      },
    });

    if (!classData) {
      throw new Error('Class not found');
    }

    return classData;
  },

  async create(data: CreateClassDto): Promise<Class> {
    return prisma.class.create({
      data,
    });
  },

  async update(id: string, data: UpdateClassDto): Promise<Class> {
    return prisma.class.update({
      where: { id },
      data,
    });
  },

  async delete(id: string): Promise<Class> {
    return prisma.class.update({
      where: { id },
      data: { active: false },
    });
  },
};