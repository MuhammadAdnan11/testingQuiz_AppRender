const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  questions: [{
    questionText: String,
    options: [String],
    correctAnswer: String
  }]
});

module.exports = mongoose.model('Quiz', quizSchema);
