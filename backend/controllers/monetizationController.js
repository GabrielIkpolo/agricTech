import Transaction from '../models/Transaction.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

export const processEscrowRelease = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');

  const commissionRate = 0.02; // 2% platform fee
  const commission = order.totalPrice * commissionRate;
  const farmerPayout = order.totalPrice - commission;

  // Record the transaction
  await Transaction.create({
    orderId: order._id,
    amount: order.totalPrice,
    commission: commission,
    farmerPayout: farmerPayout,
    type: 'COMMISSION',
    status: 'COMPLETED'
  });

  // Update order payment status
  order.paymentStatus = 'RELEASED';
  await order.save();

  return { commission, farmerPayout };
};

export const handleSubscriptionPayment = async (userId, plan) => {
  const duration = plan === 'PREMIUM' ? 30 : 0; // 30 days for premium
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + duration);

  await User.findByIdAndUpdate(userId, {
    subscriptionPlan: plan,
    subscriptionUntil: expiryDate
  });

  return { plan, expiryDate };
};
