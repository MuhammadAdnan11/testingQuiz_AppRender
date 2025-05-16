const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String
});

// Quiz Attempt Schema
const quizAttemptSchema = new mongoose.Schema({
  subject: String,
  score: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

// Export both models
const User = mongoose.model('User', userSchema);
const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);

module.exports = {
  User,
  QuizAttempt
};
