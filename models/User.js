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

// User Schema with embedded quizAttempts
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  quizAttempts: [quizAttemptSchema] // ← This line is critical
});

module.exports = mongoose.model('User', userSchema);
