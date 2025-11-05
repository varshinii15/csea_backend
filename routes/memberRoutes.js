const express = require('express');
const router = express.Router({ mergeParams: true });
const member = require('../controllers/memberController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/', authMiddleware, member.getAll);
router.post('/', authMiddleware ,member.create);
router.get('/:memberId', authMiddleware, member.getOne);
router.put('/:memberId', authMiddleware, member.update);
router.delete('/:memberId', authMiddleware, member.delete);

module.exports = router;