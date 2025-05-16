const express = require('express');
const app = express();
// const User = require('./User'); // your User model
app.use(express.json());
const User = require('./models/User');

// POST route to submit a quiz score
app.post('/submit-score', async (req, res) => {
  const { email, subject, score } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.quizAttempts.push({ subject, score, date: new Date() });
    await user.save();

    res.json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// GET route to retrieve quiz attempts for a user
app.get('/score-history/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ quizAttempts: user.quizAttempts || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Your other routes and server setup...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
