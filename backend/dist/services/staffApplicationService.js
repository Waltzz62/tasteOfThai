import { prisma } from '../config/db.js';
export const staffApplicationService = {
    async create(userId, data) {
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
    async getAll() {
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
    async getById(id) {
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
    async update(id, data) {
        const updateData = { ...data };
        if (data.status) {
            updateData.reviewedAt = new Date();
        }
        const application = await prisma.$transaction(async (tx) => {
            const updatedApplication = await tx.staffApplication.update({
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
                            password: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            });
            // If approved, create staff account and update user role
            if (data.status === 'APPROVED') {
                try {
                    // Check if staff already exists
                    const existingStaff = await tx.staff.findUnique({
                        where: { email: updatedApplication.email },
                    });
                    if (!existingStaff) {
                        // Create staff record
                        await tx.staff.create({
                            data: {
                                email: updatedApplication.email,
                                name: updatedApplication.fullName,
                                phone: updatedApplication.phone,
                                password: updatedApplication.user.password, // Password is already hashed
                                specialties: updatedApplication.skills,
                                bio: updatedApplication.experience,
                            },
                        });
                        console.log('Staff record created');
                    }
                    else {
                        console.log('Staff record already exists');
                    }
                    // Update user role to STAFF
                    await tx.user.update({
                        where: { id: updatedApplication.userId },
                        data: { role: 'STAFF' },
                    });
                    console.log('User role updated to STAFF successfully');
                }
                catch (error) {
                    console.error('Error in approval process:', error);
                    throw error;
                }
            }
            return updatedApplication;
        });
        return application;
    },
};
//# sourceMappingURL=staffApplicationService.js.map