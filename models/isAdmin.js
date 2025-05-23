// middleware/isAdmin.js
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const email = req.headers['x-admin-email']; // Use token in real app
  if (!email) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const user = await User.findOne({ email });
    if (user && user.role === 'admin') {
      req.user = user;
      next();
    } else {
      res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
