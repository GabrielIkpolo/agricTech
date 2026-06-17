import express from 'express';
import { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validate, productValidation } from '../middleware/validationMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected routes (Farmer only)
router.post('/', protect, authorize('FARMER'), validate(productValidation), upload.single('image'), createProduct);
router.put('/:id', protect, authorize('FARMER'), validate(productValidation), updateProduct);
router.delete('/:id', protect, authorize('FARMER'), deleteProduct);

export default router;
