// New file
const mongoose = require('mongoose');

const EMAIL_REGEX = /^(csea\.cse@psgtech\.ac\.in|[0-9]{2}[zn][0-9]{3}@psgtech\.ac\.in)$/;

const GoogleAuthSubSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true, match: EMAIL_REGEX },
    role: { type: String, enum: ['admin', 'member'], required: true, default: 'member' }
  },
  { _id: false }
);

const AdminUserSchema = new mongoose.Schema(
  {
    google_auth: { type: GoogleAuthSubSchema, required: true },
    googleSub: { type: String, index: true }, // stable Google user id (optional)
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

AdminUserSchema.index({ 'google_auth.email': 1 }, { unique: true });

module.exports = mongoose.model('AdminUser', AdminUserSchema);