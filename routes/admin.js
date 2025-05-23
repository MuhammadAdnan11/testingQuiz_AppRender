// routes/admin.js
const express = require('express');
const router = express.Router();
const isAdmin = require('../models/isAdmin'); // ✅ Admin middleware
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');

// ✅ Route to get total number of registered users
router.get('/api/total-users', isAdmin, async (req, res) => {
  try {
    const count = await User.countDocuments({});
    console.log('Fetching total user count...');
    res.json({ totalUsers: count });
  } catch (error) {
    console.error('Error fetching total users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Get all users (admin protected)
router.get('/api/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, 'email role');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ✅ Create new quiz
router.post('/api/quizzes', isAdmin, async (req, res) => {
  try {
    const { title, course } = req.body;
    const quiz = new Quiz({ title, course });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created' });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
});

// ✅ Get all quiz results
router.get('/api/results', isAdmin, async (req, res) => {
  try {
    const results = await Result.find().populate('user quiz', 'email title');
    const formatted = results.map(r => ({
      email: r.user?.email || 'Unknown',
      score: r.score,
      quizTitle: r.quiz?.title || 'Untitled'
    }));
    res.json(formatted);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// ✅ Upload study material
router.post('/api/upload', isAdmin, upload.single('material'), (req, res) => {
  // You can save req.file info to MongoDB here if needed
  res.status(200).json({ message: 'Uploaded successfully' });
});

module.exports = router;
