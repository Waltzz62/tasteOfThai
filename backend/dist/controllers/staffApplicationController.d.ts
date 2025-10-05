import type { AuthRequest } from '../types/type.js';
import type { Response } from 'express';
export declare const staffApplicationController: {
    create(req: AuthRequest, res: Response): Promise<void>;
    getAll(req: AuthRequest, res: Response): Promise<void>;
    getById(req: AuthRequest, res: Response): Promise<void>;
    update(req: AuthRequest, res: Response): Promise<void>;
};
//# sourceMappingURL=staffApplicationController.d.ts.map