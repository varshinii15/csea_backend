// routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');
const authMiddleware= require('../middleware/authMiddleware.js');
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

router.get('/',authMiddleware, eventController.getAllEvents);
router.get('/upcoming',authMiddleware, eventController.getUpcomingEvents);
router.get('/past',authMiddleware, eventController.getPastEvents);
router.get('/:id', authMiddleware, eventController.getEventById);
router.post('/',authMiddleware,validateSchema(eventSchema), eventController.createEvent);
router.put('/:id', authMiddleware,validateSchema(eventSchema), eventController.updateEvent);
router.delete('/:id',authMiddleware, eventController.deleteEvent);

module.exports = router;
