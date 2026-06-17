import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const { name, description, quantity, unit, price, category, location } = req.body;
    
    // Handle image from multer
    const imageUrl = req.file ? req.file.path : null;

    const product = await Product.create({
      name,
      description,
      quantity,
      unit,
      price,
      category,
      location,
      farmerId: req.user._id, // Set from authMiddleware
      image: imageUrl 
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    let productsQuery = Product.find(query).populate('farmerId', 'name phoneNumber');

    // Sorting logic
    if (sort === 'price_asc') {
      productsQuery = productsQuery.sort({ price: 1 });
    } else if (sort === 'price_desc') {
      productsQuery = productsQuery.sort({ price: -1 });
    } else {
      productsQuery = productsQuery.sort({ createdAt: -1 }); // Default: Newest first
    }

    const products = await productsQuery;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmerId', 'name phoneNumber');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Only the farmer who created the product can update it
    if (product.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
