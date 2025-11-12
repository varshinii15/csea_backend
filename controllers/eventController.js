const Event = require('../models/Event.js');



// GET /events/upcoming
exports.getUpcomingEvents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const events = await Event.find({ startDate: { $gte: new Date() } })
      .sort({ startDate: 1 })
      .limit(limit)
      .lean();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch upcoming events', details: err.message });
  }
};

// GET /events/past
exports.getPastEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ endDate: { $lte: now } }).sort({ startDate: -1 }).lean();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch past events' , details: err.message });
  }
};

// GET /events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ startDate: 1 }).lean();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events',details: err.message });
  }
};

// GET /events/:id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).lean();
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event', details: err.message });
  }
};

// POST /events
// filepath: c:\Users\Varshini\csea_backend\controllers\eventController.js
// ...existing code...

exports.createEvent = async (req, res) => {
  try {
    const { eve_name } = req.body;
    if (!eve_name) {
      return res.status(400).json({ message: 'eve_name is required' });
    }

    // Basic duplicate check: same title (case-insensitive)
    const exists = await Event.findOne({ eve_name: new RegExp(`^${eve_name.trim()}$`, 'i') }).lean();
    if (exists) {
      return res.status(409).json({ message: 'Event with this title already exists' });
    }

    const event = await Event.create({ ...req.body, eve_name: eve_name.trim(), createdBy: req.user?.id });
    res.status(201).json(event);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Event with this title already exists' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', error: err.message });
    }
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
};




// PUT /events/:id
// ...existing code...
exports.updateEvent = async (req, res) => {
  try {
    const id = req.params.id;

    // Ensure target exists first
    const current = await Event.findById(id);
    if (!current) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { eve_name } = req.body;

    // If title is being changed, ensure no other event has same title (case-insensitive)
    if (eve_name && eve_name.trim().toLowerCase() !== current.eve_name.toLowerCase()) {
      const duplicate = await Event.findOne({
        eve_name: new RegExp(`^${eve_name.trim()}$`, 'i'),
        _id: { $ne: id }
      }).lean();
      if (duplicate) {
        return res.status(409).json({ message: 'Event with this title already exists' });
      }
    }

    // Build safe update object
    const update = { ...req.body };
    if (eve_name) update.eve_name = eve_name.trim();

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      update,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedEvent);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Event with this title already exists' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', error: err.message });
    }
    res.status(500).json({ message: 'Failed to update event', error: err.message });
  }
};




// DELETE /events/:id
exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' , details: err.message });
  }
};