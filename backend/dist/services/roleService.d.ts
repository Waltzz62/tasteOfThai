import { Role } from '@prisma/client';
export declare const roleService: {
    assignRole(userId: string, role: Role): Promise<{
        id: string;
        email: string;
        name: string;
        role: Role;
    }>;
    getUserRole(userId: string): Promise<Role | null>;
    getAllUsers(): Promise<Array<{
        id: string;
        email: string;
        name: string;
        role: Role;
    }>>;
};
//# sourceMappingURL=roleService.d.ts.map