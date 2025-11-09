// routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');
const authMiddleware= require('../middleware/authMiddleware.js');

router.get('/events', authMiddleware, eventController.getAllEvents);
router.get('/events/upcoming', authMiddleware, eventController.getUpcomingEvents);
router.get('/events/past', authMiddleware, eventController.getPastEvents);
router.get('/events/:id', authMiddleware, eventController.getEventById);
router.get('/events/:id', authMiddleware, eventController.getEventById);
router.get('/events/:id', authMiddleware, eventController.getEventById);
router.post('/events',authMiddleware, eventController.createEvent);
router.put('/events/:id', authMiddleware, eventController.updateEvent);
router.delete('/events/:id',authMiddleware, eventController.deleteEvent);

module.exports = router;
