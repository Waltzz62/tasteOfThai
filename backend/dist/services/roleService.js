import { prisma } from '../config/db.js';
import { Role } from '@prisma/client';
export const roleService = {
    async assignRole(userId, role) {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { role },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });
        return user;
    },
    async getUserRole(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });
        return user?.role || null;
    },
    async getAllUsers() {
        return await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    },
};
//# sourceMappingURL=roleService.js.map