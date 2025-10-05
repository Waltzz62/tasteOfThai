import { Router } from 'express';
import { scheduleController } from '../controllers/scheduleController.js';
import { authenticate, authorize } from '../middleware/auth.js';
const schedulerouter = Router();
schedulerouter.get('/', scheduleController.getAll);
schedulerouter.get('/my-schedules', authenticate, authorize('STAFF'), scheduleController.getByStaff);
schedulerouter.post('/', authenticate, authorize('STAFF', 'ADMIN', 'DEV'), scheduleController.create);
schedulerouter.put('/:id', authenticate, authorize('STAFF', 'ADMIN', 'DEV'), scheduleController.update);
schedulerouter.delete('/:id', authenticate, authorize('ADMIN', 'DEV'), scheduleController.delete);
export default schedulerouter;
//# sourceMappingURL=scheduleRoute.js.map