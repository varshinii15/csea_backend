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
  // ...existing code in createMember...
const Vertical = require('../models/Vertical.js');
const verticalExists = await Vertical.findById(req.body.verticalId);
if (!verticalExists) {
  return res.status(404).json({ error: 'Vertical not found' });
}
// ...existing code...
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