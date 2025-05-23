const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const isAdmin = require('../models/isAdmin'); // correct path since no middleware folder

// Total users count
router.get('/api/total-users', isAdmin, async (req, res) => {
  try {
    const count = await User.countDocuments({});
    res.json({ totalUsers: count });
  } catch (error) {
    console.error('Error fetching total users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users
router.get('/api/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, 'email role');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create quiz
router.post('/api/quizzes', isAdmin, async (req, res) => {
  const { title, course } = req.body;
  try {
    const quiz = new Quiz({ title, course });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully' });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
});

// Get quiz results
router.get('/api/results', isAdmin, async (req, res) => {
  try {
    const results = await Result.find()
      .populate('user', 'email')
      .populate('quiz', 'title');

    const formattedResults = results.map(r => ({
      email: r.user?.email || 'Unknown',
      score: r.score,
      quizTitle: r.quiz?.title || 'Untitled',
    }));

    res.json(formattedResults);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// Upload study materials
router.post('/api/upload', isAdmin, upload.single('material'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Optional: save file info to DB here

    res.status(200).json({
      message: 'Uploaded successfully',
      filename: req.file.filename,
    });
  } catch (error) {
    console.error('Error during upload:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
