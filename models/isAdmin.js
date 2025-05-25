// // middleware/isAdmin.js
// module.exports = function isAdmin(req, res, next) {
//   if (req.user?.role === 'admin') next();
//   else res.status(403).json({ message: 'Access denied' });
// };


// middleware/isAdmin.js
module.exports = function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};
