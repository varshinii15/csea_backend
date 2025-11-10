const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eve_name: { type: String, required: true },
  eve_descp: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  venueStart: { type: String, required: true },
  venueEnd: { type: String, required: true },
  eveimage_url: { type: String, required: true },
  eve_reglink: { type: String } // Optional: only for upcoming events
}, { timestamps: true });


eventSchema.index({ startDate: 1, endDate: 1 });


module.exports = mongoose.model('Event', eventSchema);