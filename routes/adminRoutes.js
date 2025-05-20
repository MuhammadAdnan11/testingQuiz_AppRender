const express = require('express');
const router = express.Router();

// Example admin route
router.get('/', (req, res) => {
  res.send('Welcome to Admin Dashboard');
});

module.exports = router;
