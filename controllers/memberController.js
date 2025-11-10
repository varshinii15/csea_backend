const Member = require('../models/Member.js');

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
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Member with this email already exists' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', error: err.message });
    }
    res.status(500).json({ message: 'Failed to create member', error: err.message });
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
  try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedMember) return res.status(404).json({ message: 'Member not found' });
    res.status(200).json(updatedMember);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Member with this email already exists' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', error: err.message });
    }
    res.status(500).json({ message: 'Failed to update member', error: err.message });
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