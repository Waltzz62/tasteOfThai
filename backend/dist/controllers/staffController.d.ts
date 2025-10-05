import type { AuthRequest } from '../types/type.js';
import type { Request, Response } from 'express';
export declare const staffController: {
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    create(req: AuthRequest, res: Response): Promise<void>;
    update(req: AuthRequest, res: Response): Promise<void>;
    delete(req: AuthRequest, res: Response): Promise<void>;
};
//# sourceMappingURL=staffController.d.ts.map