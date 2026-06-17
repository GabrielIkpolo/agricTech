import express from 'express';
import { getDrivers } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/drivers', protect, authorize('FARMER', 'AGENT'), getDrivers);

export default router;
