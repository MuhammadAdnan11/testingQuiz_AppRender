// routes/admin.js
const express = require('express');
const router = express.Router();
// const isAdmin = require('../routes/isAdmin');
const isAdmin = require('../models/isAdmin'); // ✅ Correct
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');


// Get all users
router.get('/api/users', isAdmin, async (req, res) => {
  const users = await User.find({}, 'email role');
  res.json(users);
});

// Create quiz
router.post('/api/quizzes', isAdmin, async (req, res) => {
  const { title, course } = req.body;
  const quiz = new Quiz({ title, course });
  await quiz.save();
  res.status(201).json({ message: 'Quiz created' });
});

// Get all results
router.get('/api/results', isAdmin, async (req, res) => {
  const results = await Result.find().populate('user quiz', 'email title score');
  const formatted = results.map(r => ({
    email: r.user.email,
    score: r.score,
    quizTitle: r.quiz.title
  }));
  res.json(formatted);
});

// Upload study material
router.post('/api/upload', isAdmin, upload.single('material'), (req, res) => {
  // Save file path and tag to MongoDB if needed
  res.status(200).json({ message: 'Uploaded' });
});

module.exports = router;
