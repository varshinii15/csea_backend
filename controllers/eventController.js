const Event = require('../models/Event.js');



// GET /events/upcoming
exports.getUpcomingEvents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const events = await Event.find({ startDate: { $gte: new Date() } })
      .sort({ startDate: 1 })
      .limit(limit)
      .lean();
    res.status(200).json({ data: events });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch upcoming events', details: err.message });
  }
};

// GET /events/past
exports.getPastEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ startDate: { $lte: now } }).sort({ startDate: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch past events' });
  }
};

// GET /events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ startDate: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// GET /events/:id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// POST /events
// filepath: c:\Users\Varshini\csea_backend\controllers\eventController.js
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ data: event });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create event', details: err.message });
  }
};


// PUT /events/:id
exports.updateEvent = async (req, res) => {

  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};



// DELETE /events/:id
exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};