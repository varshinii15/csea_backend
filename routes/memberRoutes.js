const express = require('express');
const router = express.Router({ mergeParams: true });
const member = require('../controllers/memberController.js');
const verifyToken = require('../middleware/authMiddleware.js');

router.get('/', verifyToken, member.getAll);
router.post('/', verifyToken, member.create);
router.get('/:memberId', verifyToken, member.getOne);
router.put('/:memberId', verifyToken, member.update);
router.delete('/:memberId', verifyToken, member.delete);

module.exports = router;