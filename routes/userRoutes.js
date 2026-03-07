import { Router } from 'express';
import { register, login, update, logout } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router=Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update', isAuthenticated, update);
router.post('/logout', isAuthenticated, logout);

export default router;