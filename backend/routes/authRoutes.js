import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { validate, authValidation } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/signup', validate(authValidation), signup);
router.post('/login', login);

export default router;
