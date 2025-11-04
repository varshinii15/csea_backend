const express = require('express');
const router = express.Router();
const vertical = require('../controllers/verticalController.js');
const verifyToken = require('../middleware/authMiddleware.js');

router.post('/create', verifyToken, vertical.createVertical);
router.get('/all', vertical.getAllVerticals);
router.get('/:id', vertical.getVerticalById);
router.put('/update/:id', verifyToken, vertical.updateVertical);
router.delete('/delete/:id', verifyToken, vertical.deleteVertical);
router.get('/check/:vertical_name', vertical.checkVertical);

module.exports = router;
