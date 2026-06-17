import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const createFarmer = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password (using the same logic as authController)
    // Since we are in a controller, we'll import bcrypt
    const bcrypt = (await import('bcryptjs')).default;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const farmer = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'FARMER',
      phoneNumber,
      address,
      agentId: req.user._id // Link to the agent
    });

    res.status(201).json(farmer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getLinkedFarmers = async (req, res) => {
  try {
    const farmers = await User.find({ agentId: req.user._id });
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAgentProducts = async (req, res) => {
  try {
    // Find all farmers linked to this agent
    const farmers = await User.find({ agentId: req.user._id }).select('_id');
    const farmerIds = farmers.map(f => f._id);

    // Find all products listed by these farmers
    const products = await Product.find({ farmerId: { $in: farmerIds } })
      .populate('farmerId', 'name phoneNumber');
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const manageFarmerProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Verify if the product's farmer is linked to this agent
    const farmer = await User.findById(product.farmerId);
    if (!farmer || farmer.agentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not the agent for this farmer' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
