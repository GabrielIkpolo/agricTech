import express from 'express';
import { 
  createFarmer, 
  getLinkedFarmers, 
  getAgentProducts, 
  manageFarmerProduct 
} from '../controllers/agentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All agent routes require AGENT role
router.use(protect);
router.use(authorize('AGENT'));

router.post('/farmers', createFarmer);
router.get('/farmers', getLinkedFarmers);
router.get('/products', getAgentProducts);
router.put('/products/:productId', manageFarmerProduct);

export default router;
