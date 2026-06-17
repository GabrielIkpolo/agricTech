import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import agentRoutes from './routes/agentRoutes.js';
import ussdRoutes from './routes/ussdRoutes.js';
import monetizationRoutes from './routes/monetizationRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
// Use express.json() for all routes EXCEPT the payment webhook if we need raw body
// But for Paystack, standard JSON usually works.
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/agents', agentRoutes);
app.use('/ussd', ussdRoutes);
app.use('/api/monetization', monetizationRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('AgriTech Pipeline API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
