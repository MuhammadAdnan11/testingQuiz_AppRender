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
  profileImage: {
    type: String, // store the image file path, e.g., '/uploads/avatar123.jpg'
    default: '/uploads/default-avatar.png'
  },
  quizAttempts: [quizAttemptSchema]
});

module.exports = mongoose.model('User', userSchema);
