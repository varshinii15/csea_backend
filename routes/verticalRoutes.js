const express = require('express');
const router = express.Router();
const vertical = require('../controllers/verticalController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const validateSchema = require('../middleware/validateSchema.js');

const verticalSchema = {
  type: 'object',
  required: ['vertical_name'],
  properties: {
    vertical_name: {
      type: 'string',
      enum: [
        'obs', 'design', 'pr', 'tech',
        'content_and_documentation', 'events', 'media'
      ]
    }
  },
  additionalProperties: false
};



router.post('/create',validateSchema(verticalSchema), vertical.createVertical);
router.get('/all',vertical.getAllVerticals);
router.get('/:id',vertical.getVerticalById);
router.put('/update/:id', authMiddleware,validateSchema(verticalSchema), vertical.updateVertical);
router.delete('/delete/:id', authMiddleware, vertical.deleteVertical);
router.get('/check/:vertical_name',vertical.checkVertical);
module.exports = router;
