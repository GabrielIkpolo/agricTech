import express from 'express';
import { processEscrowRelease, handleSubscriptionPayment } from '../controllers/monetizationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/release/:orderId', protect, processEscrowRelease);
router.post('/subscribe', protect, handleSubscriptionPayment);

export default router;
