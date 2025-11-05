const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/me', authMiddleware, auth.me);
router.post('/logout', authMiddleware, auth.logout);
router.put('/update', authMiddleware, auth.update);
router.delete('/delete', authMiddleware, auth.delete);
router.get('/roles', auth.roles);
router.get('/validate', auth.validate);
router.get('/check/:email', auth.check);

module.exports = router;