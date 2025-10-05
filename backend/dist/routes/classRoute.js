import { Router } from 'express';
import { classController } from '../controllers/classController.js';
import { authenticate, authorize } from '../middleware/auth.js';
const classrouter = Router();
classrouter.get('/', classController.getAll);
classrouter.get('/:id', classController.getById);
classrouter.post('/', authenticate, authorize('ADMIN', 'DEV'), classController.create);
classrouter.put('/:id', authenticate, authorize('ADMIN', 'DEV'), classController.update);
classrouter.delete('/:id', authenticate, authorize('ADMIN', 'DEV'), classController.delete);
export default classrouter;
//# sourceMappingURL=classRoute.js.map