const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vertical_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vertical', required: true },
  mem_role: {
    type: String,
    enum: [
      'secretary', 'joint_sec', 'executive',
      'vertical_head', 'associate_vertical_head',
      'domain_head', 'domain_coordinator', 'general_member'
    ],
    required: true
  },
  mem_image: {
    type: String,
    validate: {
      validator: v => /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/.test(v),
      message: 'Invalid image URL'
    },
    required: function () { return this.mem_role !== 'general_member'; }
  },
  roll_no: { type: String, required: true }
}, { timestamps: true });

// ...existing code...
memberSchema.index({ verticalId: 1 });
// ...existing code...
module.exports = mongoose.model('Member', memberSchema);