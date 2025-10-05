import type { AuthRequest } from '../types/type.js';
import type { Response } from 'express';
export declare const bookingController: {
    create(req: AuthRequest, res: Response): Promise<void>;
    getAll(req: AuthRequest, res: Response): Promise<void>;
    getMyBookings(req: AuthRequest, res: Response): Promise<void>;
    getById(req: AuthRequest, res: Response): Promise<void>;
    updateStatus(req: AuthRequest, res: Response): Promise<void>;
};
//# sourceMappingURL=bookingController.d.ts.map