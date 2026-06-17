import Review from '../models/Review.js';
import User from '../models/User.js';

export const createReview = async (req, res) => {
  try {
    const { productId, farmerId, rating, comment, orderId } = req.body;

    // Check if review already exists for this order
    const existingReview = await Review.findOne({ orderId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this order' });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      farmer: farmerId,
      rating,
      comment,
      orderId
    });

    // Update Farmer's average rating
    const reviews = await Review.find({ farmer: farmerId });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    
    await User.findByIdAndUpdate(farmerId, { 
      averageRating: avgRating,
      totalReviews: reviews.length
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
