import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  buyerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  sellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'], 
    default: 'PENDING' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['UNPAID', 'HELD_IN_ESCROW', 'RELEASED'], 
    default: 'UNPAID' 
  },
  driverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default: null 
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
