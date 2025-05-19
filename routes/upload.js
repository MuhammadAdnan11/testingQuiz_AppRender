const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

// Setup storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = 'avatar_' + Date.now() + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Route: Upload profile picture
router.post('/upload-profile', upload.single('image'), async (req, res) => {
  const { userId } = req.body;
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

  try {
    const imagePath = '/uploads/' + req.file.filename;
    const user = await User.findByIdAndUpdate(userId, {
      profileImage: imagePath
    }, { new: true });

    res.status(200).json({
      message: 'Image uploaded successfully.',
      profileImage: imagePath
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while uploading image.' });
  }
});


// Route: Get user profile image
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ profileImage: user.profileImage });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
