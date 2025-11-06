const Member = require('../models/Member.js');
const validateSchema = require('../middleware/validateSchema.js');

const memberSchema = {
  type: 'object',
  required: ['name', 'vertical_id', 'mem_role', 'roll_no'],
  properties: {
    name: { type: 'string' },
    vertical_id: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' },
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

// GET /members/:verticalId
exports.getAll = async (req, res) => {
  try {
    const members = await Member.find({ vertical_id: req.params.verticalId });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
};

// POST /members
exports.create = async (req, res) => {
  const { valid, errors } = validateSchema(memberSchema)(req.body);
  if (!valid) return res.status(400).json({ message: 'Validation failed', errors });

  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create member' });
  }
};

// GET /members/:verticalId/:memberId
exports.getOne = async (req, res) => {
  try {
    const member = await Member.findOne({
      _id: req.params.memberId,
      vertical_id: req.params.verticalId
    });
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch member' });
  }
};

// PUT /members/:memberId
exports.update = async (req, res) => {
  const { valid, errors } = validateSchema(memberSchema)(req.body);
  if (!valid) return res.status(400).json({ message: 'Validation failed', errors });

  try {
    const updated = await Member.findByIdAndUpdate(req.params.memberId, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Member not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update member' });
  }
};

// DELETE /members/:memberId
exports.delete = async (req, res) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.memberId);
    if (!deleted) return res.status(404).json({ message: 'Member not found' });
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete member' });
  }
};