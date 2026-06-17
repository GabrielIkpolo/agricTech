import express from 'express';
import { handleUSSDRequest } from '../controllers/ussdController.js';

const router = express.Router();

// Africa's Talking sends USSD requests as POST
router.post('/handler', handleUSSDRequest);

export default router;
