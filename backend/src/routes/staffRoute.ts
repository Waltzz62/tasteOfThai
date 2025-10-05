import { Router } from 'express';
import { staffController } from '../controllers/staffController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const staffrouter = Router();

staffrouter.get('/', staffController.getAll);
staffrouter.get('/:id', staffController.getById);
staffrouter.post('/', authenticate, authorize('ADMIN', 'DEV'), staffController.create);
staffrouter.put('/:id', authenticate, authorize('ADMIN', 'DEV'), staffController.update);
staffrouter.delete('/:id', authenticate, authorize('ADMIN', 'DEV'), staffController.delete);

export default staffrouter;