import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g., 'kg', 'bag'
  price: { type: Number, required: true },
  category: { type: String }, // e.g., 'Grains', 'Tubers'
  location: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['AVAILABLE', 'SOLD', 'RESERVED'], 
    default: 'AVAILABLE' 
  },
  farmerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
