import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

export const getMarketAnalytics = async (req, res) => {
  try {
    // 1. Most Demanded Crops
    const topCrops = await Order.aggregate([
      { $group: { _id: '$productId', totalQty: { $sum: '$quantity' } } },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'details' } },
      { $unwind: '$details' },
      { $project: { name: '$details.name', totalQty: 1 } },
      { $sort: { totalQty: -1 } },
      { $limit: 5 }
    ]);

    // 2. Demand Hotspots (Location based)
    const hotspots = await Product.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // 3. Revenue Distribution
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.json({
      topCrops,
      hotspots,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Analytics error', error: error.message });
  }
};
