// routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const event = require('../controllers/eventController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/events', verifyToken, eventController.getAllEvents);
router.get('/events/upcoming', verifyToken, eventController.getUpcomingEvents);
router.get('/events/past', verifyToken, eventController.getPastEvents);
router.get('/events/:id', verifyToken, eventController.getEventById);
router.post('/events', verifyToken, eventController.createEvent);
router.put('/events/:id', verifyToken, eventController.updateEvent);
router.delete('/events/:id', verifyToken, eventController.deleteEvent);

module.exports = router;
