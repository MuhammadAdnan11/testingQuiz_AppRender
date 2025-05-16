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

// User Schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  quizAttempts: [quizAttemptSchema]  // ✅ Add this line
});

// Export model
module.exports = mongoose.model('User', userSchema);
