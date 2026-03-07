import { Router } from 'express';
import {
  createBooking,
  getAll,
  getByUserId,
  getByRoomId,
  updateByUserId,
  deleteByUserId} from '../controllers/bookingController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router=Router();

router.post('/', isAuthenticated, createBooking);
router.get('/', isAuthenticated, getAll);
router.get('/user', isAuthenticated, getByUserId);
router.get('/room/:roomId', isAuthenticated, getByRoomId);
router.put('/:id', isAuthenticated, updateByUserId);
router.delete('/:id', isAuthenticated, deleteByUserId);

export default router;