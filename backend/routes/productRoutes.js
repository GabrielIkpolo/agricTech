import express from 'express';
import { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected routes (Farmer only)
router.post('/', protect, authorize('FARMER'), upload.single('image'), createProduct);
router.put('/:id', protect, authorize('FARMER'), updateProduct);
router.delete('/:id', protect, authorize('FARMER'), deleteProduct);

export default router;
