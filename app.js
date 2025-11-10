// app.js
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get('/', (req, res) => {
  res.send('CSEA backend is running 🚀');
});

// Example modular route (you can replace with actual routes)
const adminRoutes = require('./routes/authRoutes.js');
const verticalRoutes = require('./routes/verticalRoutes.js');
const memberRoutes = require('./routes/memberRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js');


app.use('/api/v1/auth', adminRoutes);
app.use('/api/v1/verticals', verticalRoutes);
app.use('/api/v1/verticals/:id/members', memberRoutes);
app.use('/api/v1/events', eventRoutes);


// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
