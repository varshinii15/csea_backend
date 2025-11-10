
const Vertical = require('../models/Vertical.js');

// ...existing code...
exports.createVertical = async (req, res) => {
  try {
    const vertical = await Vertical.create(req.body);
    res.status(201).json(vertical);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Vertical already exists' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', error: err.message });
    }
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
    const updatedVertical = await Vertical.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedVertical) return res.status(404).json({ message: 'Vertical not found' });
    res.status(200).json(updatedVertical);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Vertical name already exists' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', error: err.message });
    }
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