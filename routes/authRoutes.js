const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController.js');
const verifyToken = require('../middleware/authMiddleware.js');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/me', verifyToken, auth.me);
router.post('/logout', verifyToken, auth.logout);
router.put('/update', verifyToken, auth.update);
router.delete('/delete', verifyToken, auth.delete);
router.get('/roles', auth.roles);
router.get('/validate', auth.validate);
router.get('/check/:email', auth.check);

module.exports = router;