import User from '../models/User.js';

export const getDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: 'DRIVER' }).select('name email phoneNumber _id');
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
