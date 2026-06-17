import axios from 'axios';
import Order from '../models/Order.js';

export const initializePayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.paymentStatus !== 'UNPAID') {
      return res.status(400).json({ message: 'Order is already paid or processing' });
    }

    const buyer = await Order.findById(orderId).populate('buyerId');
    const email = buyer.buyerId.email;
    const amount = order.totalPrice * 100; // Paystack expects amount in kobo

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount,
        callback_url: `${process.env.FRONTEND_URL}/dashboard`,
        metadata: { orderId: order._id },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Payment initialization failed', error: error.message });
  }
};

export const handleWebhook = async (req, res) => {
  try {
    const event = req.body;

    // Paystack sends various events; we care about 'charge.success'
    if (event.event === 'charge.success') {
      const { orderId } = event.data.metadata;
      
      const order = await Order.findByIdAndUpdate(
        orderId,
        { paymentStatus: 'HELD_IN_ESCROW' },
        { new: true }
      );

      if (order) {
        console.log(`Order ${orderId} payment confirmed. Funds held in escrow.`);
      }
    }

    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
};
