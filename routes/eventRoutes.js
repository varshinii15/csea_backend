// routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const event = require('../controllers/eventController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

// Get all events
router.get('/', authMiddleware, event.getAllEvents);

// Create a new event
router.post('/', authMiddleware, event.createEvent);

// Get a specific event by ID
router.get('/:eventId', authMiddleware, event.getEventById);

// Update an event by ID
router.put('/:eventId', authMiddleware, event.updateEvent);

// Delete an event by ID
router.delete('/:eventId', authMiddleware, event.deleteEvent);

// Check if an event exists by name
router.get('/check/:eve_name', authMiddleware, event.checkEvent);

module.exports = router;