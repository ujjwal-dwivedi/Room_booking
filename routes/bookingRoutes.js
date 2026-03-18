import { Router } from 'express';
import {
  createBooking,
  getAll,
  getByUserId,
  getByRoomId,
  deleteById} from '../controllers/bookingController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router=Router();

router.post('/', isAuthenticated, createBooking);
router.get('/', isAuthenticated, getAll);
router.get('/user', isAuthenticated, getByUserId);
router.get('/room/:roomId', isAuthenticated, getByRoomId);
router.delete('/:id', isAuthenticated, deleteById);

export default router;