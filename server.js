const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ CORS (allow credentials + specific origin)
app.use(cors({
  origin: 'https://testingquiz-apprender.onrender.com', // Your frontend URL
  credentials: true
}));

// ✅ Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/css', express.static('public/admin/css'));
app.use('/js', express.static('public/admin/js'));

// ✅ Session Configuration (must come before routes)
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,             // ✅ Required for HTTPS (Render)
    sameSite: 'None',         // ✅ Required for cross-site cookies
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

// ✅ Serve frontend index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Register Endpoint
app.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User registered' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Email already exists or other error' });
  }
});

// ✅ Login Endpoint (secure with bcrypt + session)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.userId = user._id;
    req.session.role = user.role;

    res.status(200).json({
      message: 'Logged in',
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ✅ Score History Endpoint
app.get('/score-history/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: 'User not found' });

    res.json({ quizAttempts: user.quizAttempts });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
});

// ✅ Submit Quiz Score
app.post('/submit-score', async (req, res) => {
  const { email, subject, score } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: 'User not found' });

    user.quizAttempts.push({ subject, score });
    await user.save();

    res.send({ message: 'Score saved' });
  } catch (error) {
    console.error('Submit score error:', error);
    res.status(500).send({ error: 'Failed to save score' });
  }
});

// ✅ Admin Routes (with middleware in admin.js)
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
