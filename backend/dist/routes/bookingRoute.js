import { Router } from 'express';
import { bookingController } from '../controllers/bookingController.js';
import { authenticate, authorize } from '../middleware/auth.js';
const bookingrouter = Router();
bookingrouter.post('/', authenticate, bookingController.create);
bookingrouter.get('/', authenticate, authorize('ADMIN', 'DEV'), bookingController.getAll);
bookingrouter.get('/my-bookings', authenticate, bookingController.getMyBookings);
bookingrouter.get('/:id', authenticate, bookingController.getById);
bookingrouter.patch('/:id/status', authenticate, authorize('ADMIN', 'DEV'), bookingController.updateStatus);
export default bookingrouter;
//# sourceMappingURL=bookingRoute.js.map