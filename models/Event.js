const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  created_by: {
    type: String, // email of the admin or member who created it
    required: true,
    match: /^(csea\.cse@psgtech\.ac\.in|[0-9]{2}[zn][0-9]{3}@psgtech\.ac\.in)$/
  },
  participants: [
    {
      name: String,
      email: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      registeredAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
