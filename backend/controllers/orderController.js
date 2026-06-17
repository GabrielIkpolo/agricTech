import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { notificationService } from '../services/notificationService.js';

export const placeOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient quantity available' });
    }

    const totalPrice = product.price * quantity;

    const order = await Order.create({
      productId,
      buyerId: req.user._id,
      sellerId: product.farmerId,
      quantity,
      totalPrice,
    });

    // Notify Farmer via WhatsApp
    const farmer = await User.findById(product.farmerId);
    if (farmer?.phoneNumber) {
      notificationService.sendWhatsAppNotification(
        farmer.phoneNumber, 
        `Hello ${farmer.name}, you have a new order for ${quantity} ${product.unit} of ${product.name}! Total: ₦${totalPrice}.`
      );
    }

    // Optionally decrease product quantity (or reserve it)
    product.quantity -= quantity;
    product.status = product.quantity === 0 ? 'SOLD' : 'AVAILABLE';
    await product.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    // Get orders where user is either buyer or seller
    const orders = await Order.find({
      $or: [{ buyerId: req.user._id }, { sellerId: req.user._id }]
    }).populate('productId buyerId sellerId');
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Authorization check:
    // If updating to SHIPPED, must be Seller or Driver
    // If updating to DELIVERED, must be Buyer or Driver
    
    if (status === 'SHIPPED' && req.user.role !== 'FARMER' && req.user.role !== 'DRIVER') {
      return res.status(403).json({ message: 'Only Farmer or Driver can mark as shipped' });
    }

    if (status === 'DELIVERED' && req.user.role !== 'BUYER' && req.user.role !== 'DRIVER') {
      return res.status(403).json({ message: 'Only Buyer or Driver can mark as delivered' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, 
      { status, paymentStatus }, 
      { new: true }
    );

    // Notify Buyer via WhatsApp
    const orderWithUsers = await Order.findById(updatedOrder._id).populate('buyerId');
    if (orderWithUsers?.buyerId?.phoneNumber) {
      notificationService.sendWhatsAppNotification(
        orderWithUsers.buyerId.phoneNumber,
        `Your order for ${orderWithUsers.productId?.name} is now ${status}!`
      );
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const assignDriver = async (req, res) => {
  try {
    const { driverId } = req.body;
    
    if (req.user.role !== 'FARMER' && req.user.role !== 'AGENT') {
      return res.status(403).json({ message: 'Only Farmers or Agents can assign drivers' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { driverId }, 
      { new: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
