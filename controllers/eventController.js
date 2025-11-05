const Event = require('../models/Event.js');

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { eve_name, eve_descp, eve_date, eve_venue, eveimage_url, eve_reglink } = req.body;

    // Check if event with same name already exists
    const existing = await Event.findOne({ eve_name });
    if (existing) {
      return res.status(409).json({ message: 'Event already exists' });
    }

    const event = await Event.create({
      eve_name,
      eve_descp,
      eve_date,
      eve_venue,
      eveimage_url,
      eve_reglink
    });

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create event', error: err.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch event', error: err.message });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event updated successfully', updated });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update event', error: err.message });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event', error: err.message });
  }
};

// Check if an event exists by name
exports.checkEvent = async (req, res) => {
  try {
    const { eve_name } = req.params;
    const exists = await Event.findOne({ eve_name });
    res.json({ exists: !!exists });
  } catch (err) {
    res.status(500).json({ message: 'Error checking event', error: err.message });
  }
};
