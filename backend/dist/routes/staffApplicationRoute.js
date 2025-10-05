import { Router } from 'express';
import { staffApplicationController } from '../controllers/staffApplicationController.js';
import { authenticate, authorize } from '../middleware/auth.js';
const staffApplicationrouter = Router();
staffApplicationrouter.post('/', authenticate, staffApplicationController.create);
staffApplicationrouter.get('/', authenticate, authorize('ADMIN', 'DEV'), staffApplicationController.getAll);
staffApplicationrouter.get('/:id', authenticate, authorize('ADMIN', 'DEV'), staffApplicationController.getById);
staffApplicationrouter.patch('/:id', authenticate, authorize('ADMIN', 'DEV'), staffApplicationController.update);
export default staffApplicationrouter;
//# sourceMappingURL=staffApplicationRoute.js.map