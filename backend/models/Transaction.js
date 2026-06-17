import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  orderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  },
  amount: { type: Number, required: true },
  commission: { type: Number, required: true },
  farmerPayout: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['COMMISSION', 'SUBSCRIPTION'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['PENDING', 'COMPLETED', 'FAILED'], 
    default: 'PENDING' 
  },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
