const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  google_auth: {
    email: {
      type: String,
      required: true,
      match: /^(csea\.cse@psgtech\.ac\.in|[0-9]{2}[zn][0-9]{3}@psgtech\.ac\.in)$/
    },
    google_id_token: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'member'],
      required: true
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('AdminUser', adminUserSchema);