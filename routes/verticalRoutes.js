const express = require('express');
const router = express.Router();
const vertical = require('../controllers/verticalController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/create', vertical.createVertical);
router.get('/all', vertical.getAllVerticals);
router.get('/:id', vertical.getVerticalById);
router.put('/update/:id', authMiddleware, vertical.updateVertical);
router.delete('/delete/:id', authMiddleware, vertical.deleteVertical);
router.get('/check/:vertical_name', vertical.checkVertical);

module.exports = router;
