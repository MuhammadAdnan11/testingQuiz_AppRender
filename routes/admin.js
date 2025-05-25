// routes/admin.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');

const adminAuth = require('../middleware/adminAuth'); // Admin middleware

// ✅ New route: Check if user is admin
router.get('/api/check-admin', adminAuth, (req, res) => {
  res.json({ message: 'User is admin', email: req.user.email });
});

// ✅ Get total number of users (students)
router.get('/api/total-users', adminAuth, async (req, res) => {
  try {
    const count = await User.countDocuments({});
    res.json({ totalUsers: count });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Get all users
router.get('/api/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, 'email role');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Create quiz
router.post('/api/quizzes', adminAuth, async (req, res) => {
  try {
    const { title, course } = req.body;
    const quiz = new Quiz({ title, course });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created', quiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Get all results
router.get('/api/results', adminAuth, async (req, res) => {
  try {
    const results = await Result.find().populate('user quiz', 'email title score');
    const formatted = results.map(r => ({
      email: r.user.email,
      score: r.score,
      quizTitle: r.quiz.title
    }));
    res.json(formatted);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Upload study material
router.post('/api/upload', adminAuth, upload.single('material'), (req, res) => {
  try {
    // Save file path and tag to MongoDB if needed
    res.status(200).json({ message: 'Uploaded successfully' });
  } catch (error) {
    console.error('Error uploading material:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
