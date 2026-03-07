import { Router } from 'express';
import { getAll, getById, createRoom, update, deleteRoom } from '../controllers/roomController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router=Router();

router.get('/', isAuthenticated, getAll);
router.get('/:id', isAuthenticated, getById);
router.post('/', isAuthenticated, createRoom);
router.put('/:id', isAuthenticated, update);
router.delete('/:id', isAuthenticated, deleteRoom);

export default router;