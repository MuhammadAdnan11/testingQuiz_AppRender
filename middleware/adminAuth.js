// middleware/adminAuth.js
const User = require('../models/User');

const adminAuth = async (req, res, next) => {
  const email = req.headers['x-user-email'];

  if (!email) {
    return res.status(401).json({ message: 'Unauthorized: No email header' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Not an admin' });
    }

    req.user = user; // attach user to request (optional)
    next();
  } catch (err) {
    console.error('Admin check failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = adminAuth;
