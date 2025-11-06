const Event = require('../models/Event.js');
const validateSchema = require('../middleware/validateSchema.js');

const eventSchema = {
  type: 'object',
  required: [
    'eve_name', 'eve_descp', 'startDate',
    'endDate', 'venueStart', 'venueEnd', 'eveimage_url'
  ],
  properties: {
    eve_name: { type: 'string' },
    eve_descp: { type: 'string' },
    startDate: { type: 'string', format: 'date-time' },
    endDate: { type: 'string', format: 'date-time' },
    venueStart: { type: 'string' },
    venueEnd: { type: 'string' },
    eveimage_url: { type: 'string', format: 'uri' },
    eve_reglink: { type: 'string', format: 'uri' }
  },
  additionalProperties: false
};

// GET /events/upcoming
exports.getUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ startDate: { $gt: now } }).sort({ startDate: 1 });

    const formatted = events.map(event => {
      const e = {
        _id: event._id,
        eve_name: event.eve_name,
        eve_descp: event.eve_descp,
        startDate: event.startDate,
        endDate: event.endDate,
        venueStart: event.venueStart,
        venueEnd: event.venueEnd,
        eveimage_url: event.eveimage_url
      };
      if (event.eve_reglink) e.eve_reglink = event.eve_reglink;
      return e;
    });

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch upcoming events' });
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
exports.createEvent = async (req, res) => {
  const { valid, errors } = validateSchema(eventSchema)(req.body);
  if (!valid) return res.status(400).json({ message: 'Validation failed', errors });

  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }

};


// PUT /events/:id
exports.updateEvent = async (req, res) => {
  const { valid, errors } = validateSchema(eventSchema)(req.body);
  if (!valid) return res.status(400).json({ message: 'Validation failed', errors });

  exports.updateEvent = async (req, res) => {
  const { valid, errors } = validateSchema(eventSchema)(req.body);
  if (!valid) return res.status(400).json({ message: 'Validation failed', errors });

  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};
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