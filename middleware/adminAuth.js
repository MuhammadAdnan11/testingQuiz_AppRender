// // middleware/adminAuth.js
// const User = require('../models/User');

// const adminAuth = async (req, res, next) => {
//   const email = req.headers['x-user-email'];

//   if (!email) {
//     return res.status(401).json({ message: 'Unauthorized: No email header' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (user.role !== 'admin') {
//       return res.status(403).json({ message: 'Forbidden: Not an admin' });
//     }

//     req.user = user; // attach user to request (optional)
//     next();
//   } catch (err) {
//     console.error('Admin check failed:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = adminAuth;
// middleware/adminAuth.js

const User = require('../models/User'); // adjust path to your User model

async function adminAuth(req, res, next) {
  try {
    const email = req.headers['x-user-email'];
    if (!email) {
      return res.status(401).json({ error: 'No user email provided in headers' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only' });
    }

    // Attach user info to request if needed later
    req.user = user;

    next();
  } catch (err) {
    console.error('adminAuth error:', err);
    res.status(500).json({ error: 'Server error in adminAuth middleware' });
  }
}

module.exports = adminAuth;
