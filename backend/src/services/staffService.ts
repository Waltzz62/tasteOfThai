import type {
  CreateStaffDto,
  UpdateStaffDto,
  StaffWithoutPassword,
} from "../types/type.js";
import { prisma } from "../config/db.js";
import { hashPassword } from "../utils/hash.js";

export const staffService = {
  async getAll(): Promise<StaffWithoutPassword[]> {
    return prisma.staff.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        image: true,
        bio: true,
        specialties: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async getById(id: string): Promise<StaffWithoutPassword> {
    const staff = await prisma.staff.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        image: true,
        bio: true,
        specialties: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!staff) {
      throw new Error("Staff not found");
    }

    return staff;
  },

  async create(data: CreateStaffDto): Promise<StaffWithoutPassword> {
    const existingStaff = await prisma.staff.findUnique({
      where: { email: data.email },
    });

    if (existingStaff) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const staff = await prisma.staff.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        image: true,
        bio: true,
        specialties: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return staff;
  },

  async update(
    id: string,
    data: UpdateStaffDto
  ): Promise<StaffWithoutPassword> {
    const staff = await prisma.staff.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        image: true,
        bio: true,
        specialties: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return staff;
  },

  async delete(id: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      // Get staff info
      const staff = await tx.staff.findUnique({
        where: { id },
        select: { email: true },
      });

      if (!staff) {
        throw new Error("Staff not found");
      }

      // Find corresponding user and change role back to USER
      await tx.user.updateMany({
        where: { email: staff.email },
        data: { role: "USER" },
      });

      // Delete staff record completely
      await tx.staff.delete({
        where: { id },
      });
    });
  },
};
