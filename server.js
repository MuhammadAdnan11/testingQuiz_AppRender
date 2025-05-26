// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const User = require('./models/User');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ✅ Import admin routes and adminAuth middleware
// const adminRoutes = require('./routes/admin'); // assuming routes/admin.js exists
// const adminAuth = require('./middleware/adminAuth'); // ← Admin middleware

// // ✅ Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch((err) => console.error('❌ MongoDB connection error:', err));

// // ✅ Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // ✅ Serve static files
// app.use('/css', express.static('public/admin/css'));
// app.use('/js', express.static('public/admin/js'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ✅ Serve index.html at root
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // ✅ User Registration Endpoint
// app.post('/register', async (req, res) => {
//   const { fullName, email, password } = req.body;
//   try {
//     const user = new User({ fullName, email, password });
//     await user.save();
//     res.status(201).send({ message: 'User registered' });
//   } catch (error) {
//     console.error(error);
//     res.status(400).send({ error: 'Email already exists or other error' });
//   }
// });

// // 🔑 Updated User Login Endpoint to include user role in response
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || user.password !== password) {
//       return res.status(401).send({ error: 'Invalid credentials' });
//     }

//     // Return email and role for frontend logic
//     res.json({
//       message: 'Login successful',
//       email: user.email,
//       role: user.role,  // <-- Make sure this field exists in your User model
//     });
//   } catch (error) {
//     res.status(500).send({ error: 'Server error' });
//   }
// });

// // ✅ Score History Endpoint
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

// // ✅ Submit Score Endpoint
// app.post('/submit-score', async (req, res) => {
//   const { email, subject, score } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).send({ error: 'User not found' });

//     user.quizAttempts.push({ subject, score });
//     await user.save();

//     res.send({ message: 'Score saved' });
//   } catch (error) {
//     console.error('Submit score error:', error);
//     res.status(500).send({ error: 'Failed to save score' });
//   }
// });

// // ✅ Admin Routes with adminAuth middleware
// app.use('/admin', adminAuth, adminRoutes);

// // ✅ Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const User = require('./models/User');
require('dotenv').config();
const galleryRoutes = require('./routes/gallery'); // <-- make sure this file exists

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Import admin routes and adminAuth middleware
const adminRoutes = require('./routes/admin'); // assuming routes/admin.js exists
const adminAuth = require('./middleware/adminAuth'); // ← Admin middleware

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // <-- added for form uploads

// ✅ Serve static files
app.use('/css', express.static('public/admin/css'));
app.use('/js', express.static('public/admin/js'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // <-- serves uploaded images

// ✅ Serve index.html at root
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

// 🔑 Updated User Login Endpoint to include user role in response
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    // Return email and role for frontend logic
    res.json({
      message: 'Login successful',
      email: user.email,
      role: user.role,  // <-- Make sure this field exists in your User model
    });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
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

// ✅ Submit Score Endpoint
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

// ✅ Admin Routes with adminAuth middleware
app.use('/admin', adminAuth, adminRoutes);

// ✅ Gallery Routes (no auth so frontend can fetch images)
app.use(galleryRoutes); // <-- NEW: handles /api/gallery and /admin/gallery/upload

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
