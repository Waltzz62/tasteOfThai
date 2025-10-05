import { staffApplicationService } from '../services/staffApplicationService.js';
import { prisma } from '../config/db.js';
export const staffApplicationController = {
    async create(req, res) {
        try {
            const result = await staffApplicationService.create(req.user.id, req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Application failed'
            });
        }
    },
    async getAll(req, res) {
        try {
            const result = await staffApplicationService.getAll();
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Failed to fetch applications' });
        }
    },
    async getById(req, res) {
        try {
            const result = await staffApplicationService.getById(req.params.id);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(404).json({ success: false, message: 'Application not found' });
        }
    },
    async update(req, res) {
        try {
            console.log('Updating application:', req.params.id, 'with data:', req.body);
            const result = await staffApplicationService.update(req.params.id, req.body);
            console.log('Update result:', result);
            // Debug: Check if user role was actually updated
            if (req.body.status === 'APPROVED') {
                const updatedUser = await prisma.user.findUnique({
                    where: { id: result.userId },
                    select: { id: true, email: true, role: true }
                });
                console.log('User after update:', updatedUser);
            }
            res.json({ success: true, data: result });
        }
        catch (error) {
            console.error('Error updating application:', error);
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to update application'
            });
        }
    },
};
//# sourceMappingURL=staffApplicationController.js.map