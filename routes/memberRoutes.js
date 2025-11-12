const express = require('express');
const router = express.Router({ mergeParams: true });
const member = require('../controllers/memberController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const validateSchema = require('../middleware/validateSchema.js');

const memberSchema = {
  type: 'object',
  required: ['name', 'vertical_id', 'mem_role', 'roll_no'],
  properties: {
    name: { type: 'string' },
    vertical_id: {
      type: 'string',
      pattern: '^[a-fA-F0-9]{24}$'
    },
    mem_role: {
      type: 'string',
      enum: [
        'secretary', 'joint_sec', 'executive',
        'vertical_head', 'associate_vertical_head',
        'domain_head', 'domain_coordinator', 'general_member'
      ]
    },
    mem_image: {
      type: 'string',
      pattern: '^https?:\/\/.+\\.(jpg|jpeg|png|webp|svg)$'
    },
    roll_no: { type: 'string' }
  },
  additionalProperties: false,
  if: {
    properties: { mem_role: { not: { const: 'general_member' } } }
  },
  then: {
    required: ['mem_image']
  }
};



router.get('/', authMiddleware, member.getAll);
router.post('/', authMiddleware ,validateSchema(memberSchema),member.create);
router.get('/:id', authMiddleware, member.getOne);
router.put('/:id', authMiddleware,validateSchema(memberSchema), member.update);
router.delete('/:id', authMiddleware, member.delete);

module.exports = router;