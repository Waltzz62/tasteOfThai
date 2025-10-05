import { classService } from '../services/classService.js';
export const classController = {
    async getAll(req, res) {
        try {
            const result = await classService.getAll(req.query);
            res.json({ success: true, ...result });
        }
        catch (error) {
            console.error('Error fetching classes:', error);
            res.status(500).json({ success: false, message: 'Failed to fetch classes' });
        }
    },
    async getById(req, res) {
        try {
            const result = await classService.getById(req.params.id);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(404).json({ success: false, message: 'Class not found' });
        }
    },
    async create(req, res) {
        try {
            const result = await classService.create(req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (error) {
            res.status(400).json({ success: false, message: 'Failed to create class' });
        }
    },
    async update(req, res) {
        try {
            const result = await classService.update(req.params.id, req.body);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(400).json({ success: false, message: 'Failed to update class' });
        }
    },
    async delete(req, res) {
        try {
            await classService.delete(req.params.id);
            res.json({ success: true, message: 'Class deleted' });
        }
        catch (error) {
            res.status(400).json({ success: false, message: 'Failed to delete class' });
        }
    },
};
//# sourceMappingURL=classController.js.map