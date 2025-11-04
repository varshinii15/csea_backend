// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

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
const memberRoutes = require('./routes/memberRoutes.js');
const verticalRoutes = require('./routes/verticalRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js');


app.use('/api/v1/auth', adminRoutes);
app.use('/api/v1/verticals/:verticalId/members', memberRoutes);
app.use('/api/v1/verticals', verticalRoutes);
app.use('/api/v1/events', eventRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});