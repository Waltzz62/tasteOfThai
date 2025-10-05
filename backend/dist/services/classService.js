import { prisma } from "../config/db.js";
export const classService = {
    async getAll(filters) {
        const { page = 1, limit = 10, difficulty, minPrice, maxPrice, active = true, } = filters || {};
        const where = { active };
        if (difficulty)
            where.difficulty = difficulty;
        const minPriceNum = minPrice
            ? parseFloat(minPrice)
            : undefined;
        const maxPriceNum = maxPrice;
        if (minPriceNum !== undefined || maxPriceNum !== undefined) {
            where.price = {};
            if (minPriceNum !== undefined)
                where.price.gte = minPriceNum;
            if (maxPriceNum !== undefined)
                where.price.lte = maxPriceNum;
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
                            status: "SCHEDULED",
                        },
                        orderBy: { startTime: "asc" },
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
    async getById(id) {
        const classData = await prisma.class.findUnique({
            where: { id },
            include: {
                schedules: {
                    where: { startTime: { gte: new Date() } },
                    include: { staff: true },
                    orderBy: { startTime: "asc" },
                },
            },
        });
        if (!classData) {
            throw new Error("Class not found");
        }
        return classData;
    },
    async create(data) {
        return prisma.class.create({
            data,
        });
    },
    async update(id, data) {
        return prisma.class.update({
            where: { id },
            data,
        });
    },
    async delete(id) {
        return prisma.class.update({
            where: { id },
            data: { active: false },
        });
    },
};
//# sourceMappingURL=classService.js.map