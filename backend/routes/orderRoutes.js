import express from 'express';
import { 
  placeOrder, 
  getMyOrders, 
  updateOrderStatus, 
  assignDriver 
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validate, orderValidation } from '../middleware/validationMiddleware.js';

const router = express.Router();

// All order routes require authentication
router.use(protect);

router.post('/', authorize('BUYER'), validate(orderValidation), placeOrder);
router.get('/my-orders', getMyOrders);
router.put('/:id/status', updateOrderStatus);
router.put('/:id/driver', authorize('FARMER', 'AGENT'), assignDriver);

export default router;
