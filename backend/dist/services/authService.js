import { prisma } from '../config/db.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';
export const authService = {
    async register(data) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const hashedPassword = await hashPassword(data.password);
        const user = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                phone: data.phone ?? null,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });
        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        return { token, user };
    },
    async login(credentials) {
        const user = await prisma.user.findUnique({
            where: { email: credentials.email },
        });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isValid = await comparePassword(credentials.password, user.password);
        if (!isValid) {
            throw new Error('Invalid credentials');
        }
        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    },
    // Staff Login
    async staffLogin(credentials) {
        const user = await prisma.user.findUnique({
            where: {
                email: credentials.email,
                role: 'STAFF'
            },
        });
        if (!user) {
            throw new Error('Invalid credentials or not a staff member');
        }
        const isValid = await comparePassword(credentials.password, user.password);
        if (!isValid) {
            throw new Error('Invalid credentials');
        }
        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    },
};
//# sourceMappingURL=authService.js.map