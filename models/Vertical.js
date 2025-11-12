const mongoose = require('mongoose');

const verticalSchema = new mongoose.Schema({
  vertical_name: {
    type: String,
    required: true,
    enum: [
      'obs',
      'design',
      'pr',
      'tech',
      'content_and_documentation',
      'events',
      'media'
    ]
  }
}, { timestamps: true });

// ...existing code...

// ...existing code...
module.exports = mongoose.model('Vertical', verticalSchema);
