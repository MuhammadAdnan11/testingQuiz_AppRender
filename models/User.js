const mongoose = require('mongoose');

// Quiz Attempt Schema
const quizAttemptSchema = new mongoose.Schema({
  subject: String,
  score: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

// Updated User Schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  // profileImage: {
  //   type: String,
  //   default: '/uploads/default-avatar.png'
  // },
  quizAttempts: [quizAttemptSchema]
});

module.exports = mongoose.model('User', userSchema);
