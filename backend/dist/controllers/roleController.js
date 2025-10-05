import { roleService } from '../services/roleService.js';
import { Role } from '@prisma/client';
export const roleController = {
    async assignRole(req, res) {
        try {
            const { userId, role } = req.body;
            if (!userId || !role) {
                res.status(400).json({ success: false, message: 'User ID and role are required' });
                return;
            }
            if (!Object.values(Role).includes(role)) {
                res.status(400).json({ success: false, message: 'Invalid role' });
                return;
            }
            const user = await roleService.assignRole(userId, role);
            res.json({ success: true, data: user });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to assign role'
            });
        }
    },
    async getAllUsers(req, res) {
        try {
            const users = await roleService.getAllUsers();
            res.json({ success: true, data: users });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to fetch users'
            });
        }
    },
};
//# sourceMappingURL=roleController.js.map