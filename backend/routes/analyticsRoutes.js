import express from 'express';
import { getMarketAnalytics } from '../controllers/analyticsController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only Agents or Admin can see market analytics
router.get('/market-stats', protect, authorize('AGENT'), getMarketAnalytics);

export default router;
