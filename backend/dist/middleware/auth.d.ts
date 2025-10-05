import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../types/type.js';
import { Role } from '@prisma/client';
export declare const authenticate: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const authorize: (...roles: Role[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map