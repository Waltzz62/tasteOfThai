import { prisma } from '../config/db.js';
export const scheduleService = {
    async getAll() {
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
    async getByStaff(staffId) {
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
    async create(data) {
        return prisma.schedule.create({
            data,
        });
    },
    async update(id, data) {
        return prisma.schedule.update({
            where: { id },
            data,
        });
    },
    async delete(id) {
        return prisma.schedule.delete({
            where: { id },
        });
    },
};
//# sourceMappingURL=scheduleService.js.map