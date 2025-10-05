import { Router } from 'express';
import { authController } from '../controllers/authController.js';
const authrouter = Router();
authrouter.post('/register', authController.register);
authrouter.post('/login', authController.login);
authrouter.post('/staff/login', authController.staffLogin);
export default authrouter;
//# sourceMappingURL=authRoute.js.map