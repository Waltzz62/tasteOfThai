import { staffService } from '../services/staffService.js';
export const staffController = {
    async getAll(req, res) {
        try {
            const result = await staffService.getAll();
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Failed to fetch staff' });
        }
    },
    async getById(req, res) {
        try {
            const result = await staffService.getById(req.params.id);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(404).json({ success: false, message: 'Staff not found' });
        }
    },
    async create(req, res) {
        try {
            const result = await staffService.create(req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create staff'
            });
        }
    },
    async update(req, res) {
        try {
            const result = await staffService.update(req.params.id, req.body);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(400).json({ success: false, message: 'Failed to update staff' });
        }
    },
    async delete(req, res) {
        try {
            await staffService.delete(req.params.id);
            res.json({ success: true, message: 'Staff deactivated' });
        }
        catch (error) {
            res.status(400).json({ success: false, message: 'Failed to delete staff' });
        }
    },
};
//# sourceMappingURL=staffController.js.map