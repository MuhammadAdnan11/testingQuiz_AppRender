const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// const User = require('./models/User');
 // Make sure this exists and is correctly defined
require('dotenv').config();
const User = require('./models/User');


const app = express();
const PORT = process.env.PORT || 5000; // Use Render’s dynamic port



// const uploadRoute = require('./routes/upload');
const uploadRoutes = require('./routes/upload');
app.use('/api', uploadRoutes);

// In your app.js/server.js
app.use(express.static('public'));






// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));


// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Serve index.html on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ User Registration Endpoint
app.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = new User({ fullName, email, password });
    await user.save();
    res.status(201).send({ message: 'User registered' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Email already exists or other error' });
  }
});

// ✅ User Login Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    res.send({ message: 'Login successful' });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});



// app.get('/score-history/:email', async (req, res) => {
//   const { email } = req.params;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).send({ error: 'User not found' });

//     res.json({ quizAttempts: user.quizAttempts });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Server error' });
//   }
// });
app.get('/score-history/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).send({ error: 'User not found' });

    // ✅ Send back quiz attempts as JSON
    res.json({ quizAttempts: user.quizAttempts });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
});


app.post('/submit-score', async (req, res) => {
  const { email, subject, score } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: 'User not found' });

    // ✅ Push new score into quizAttempts
    user.quizAttempts.push({ subject, score });
    await user.save();

    res.send({ message: 'Score saved' });
  } catch (error) {
    console.error('Submit score error:', error);
    res.status(500).send({ error: 'Failed to save score' });
  }
});





//   const { email, subject, score } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).send({ error: 'User not found' });

//     user.quizAttempts.push({ subject, score }); // ← This adds a new attempt
//     await user.save();

//     res.send({ message: 'Score saved' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Failed to save score' });
//   }
// });




//   const { email, subject, score } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).send({ error: 'User not found' });

//     user.quizAttempts.push({ subject, score });
//     await user.save();

//     res.send({ message: 'Score saved' });
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to save score' });
//   }
// });

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

