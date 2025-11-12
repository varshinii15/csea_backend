const Member = require('../models/Member.js');

// GET /members/:verticalId
exports.getAll = async (req, res) => {
  try {
    const members = await Member.find({ vertical_id: req.params.id }).lean();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
};

// POST /members
// ...existing code...
exports.create = async (req, res) => {
  try {
    const { name, roll_no, vertical_id, mem_role } = req.body;
    if (!name || !roll_no || !vertical_id || !mem_role) {
      return res.status(400).json({ message: 'name, roll_no, vertical_id, mem_role are required' });
    }

    // Duplicate check by roll_no (case-insensitive)
    const exists = await Member.findOne({ roll_no: new RegExp(`^${roll_no.trim()}$`, 'i') }).lean();
    if (exists) {
      return res.status(409).json({ message: 'Member with this roll_no already exists' });
    }

    const member = await Member.create({
      name: name.trim(),
      roll_no: roll_no.trim().toLowerCase(),
      vertical_id,
      mem_role
    });

    return res.status(201).json(member);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Member with this roll_no already exists' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', error: err.message });
    }
    return res.status(500).json({ message: 'Failed to create member', error: err.message });
  }
};

// GET /members/:verticalId/:memberId
exports.getOne = async (req, res) => {
  try {
    const member = await Member.findOne({
      _id: req.params.id,
    });
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch member' });
  }
};

// PUT /members/:memberId
// ...existing code...
exports.update = async (req, res) => {
  try {
    const memberId = req.params.memberId || req.params.id;

    // Ensure target exists first
    const current = await Member.findById(memberId);
    if (!current) {
      return res.status(404).json({ message: 'Member not found' });
    }

    const { name, email, vertical_id } = req.body;

    // If email is being changed, ensure uniqueness (case-insensitive)
    if (email && email.toLowerCase() !== current.email.toLowerCase()) {
      const duplicate = await Member.findOne({
        email: new RegExp(`^${email}$`, 'i'),
        _id: { $ne: memberId }
      });
      if (duplicate) {
        return res.status(409).json({ message: 'Member with this email already exists' });
      }
    }

    // Build update object (only allow specific fields)
    const update = {};
    if (name) update.name = name.trim();
    if (email) update.email = email.toLowerCase().trim();
    if (vertical_id) update.vertical_id = vertical_id;

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    const updated = await Member.findByIdAndUpdate(
      memberId,
      update,
      { new: true, runValidators: true }
    );

    res.status(200).json(updated);
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
// ...existing code...
// DELETE /members/:memberId
exports.delete = async (req, res) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Member not found' });
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete member' });
  }
};