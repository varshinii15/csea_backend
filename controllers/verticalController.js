
const Vertical = require('../models/Vertical.js');

exports.createVertical = async (req, res) => {
  try {
    const vertical = await Vertical.create(req.body);
    res.status(201).json(vertical);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create vertical', error: err.message });
  }
};

exports.getAllVerticals = async (req, res) => {
  try {
    const verticals = await Vertical.find();
    res.json(verticals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch verticals', error: err.message });
  }
};

exports.getVerticalById = async (req, res) => {
  try {
    const vertical = await Vertical.findById(req.params.id);
    if (!vertical) return res.status(404).json({ message: 'Vertical not found' });
    res.json(vertical);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vertical', error: err.message });
  }
};

exports.updateVertical = async (req, res) => {
  try {
    // 408 if no update data
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(408).json({ message: 'Request Timeout: No update data received' });
    }

    // Optional: validate vertical_name manually
    const allowedVerticals = [
      'obs', 'design', 'pr', 'tech',
      'content_and_documentation', 'events', 'media'
    ];
    if (!allowedVerticals.includes(req.body.vertical_name)) {
      return res.status(400).json({ message: 'Invalid vertical_name' });
    }

    const updated = await Vertical.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Vertical not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update vertical', error: err.message });
  }
};
exports.deleteVertical = async (req, res) => {
  try {
    const deleted = await Vertical.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Vertical not found' });
    res.json({ message: 'Vertical deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete vertical', error: err.message });
  }
};

exports.checkVertical = async (req, res) => {
  try {
    const { vertical_name } = req.params;
    const exists = await Vertical.findOne({ vertical_name });
    res.json({ exists: !!exists });
  } catch (err) {
    res.status(500).json({ message: 'Error checking vertical', error: err.message });
  }
};