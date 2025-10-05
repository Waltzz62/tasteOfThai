import { Role } from '@prisma/client';
interface JwtPayload {
    id: string;
    email: string;
    role: Role;
}
export declare const generateToken: (payload: JwtPayload) => string;
export declare const verifyToken: (token: string) => JwtPayload;
export {};
//# sourceMappingURL=jwt.d.ts.map