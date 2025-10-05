import { scheduleService } from '../services/scheduleService.js';
import { prisma } from '../config/db.js';
export const scheduleController = {
    async getAll(req, res) {
        try {
            const result = await scheduleService.getAll();
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Failed to fetch schedules' });
        }
    },
    async getByStaff(req, res) {
        try {
            // Find staff record using user email
            const staff = await prisma.staff.findUnique({
                where: { email: req.user.email },
                select: { id: true },
            });
            if (!staff) {
                res.status(404).json({ success: false, message: 'Staff record not found' });
                return;
            }
            const result = await scheduleService.getByStaff(staff.id);
            res.json({ success: true, data: result });
        }
        catch (error) {
            console.error('Error fetching staff schedules:', error);
            res.status(500).json({ success: false, message: 'Failed to fetch schedules' });
        }
    },
    async create(req, res) {
        try {
            const result = await scheduleService.create(req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (error) {
            res.status(400).json({ success: false, message: 'Failed to create schedule' });
        }
    },
    async update(req, res) {
        try {
            const result = await scheduleService.update(req.params.id, req.body);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(400).json({ success: false, message: 'Failed to update schedule' });
        }
    },
    async delete(req, res) {
        try {
            await scheduleService.delete(req.params.id);
            res.json({ success: true, message: 'Schedule deleted' });
        }
        catch (error) {
            res.status(400).json({ success: false, message: 'Failed to delete schedule' });
        }
    },
};
//# sourceMappingURL=scheduleController.js.map