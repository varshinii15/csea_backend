// controllers/VerticalController.js
const Vertical = require('../models/Vertical.js');

// Create a new vertical
exports.createVertical = async (req, res) => {
  try {
    const { vertical_name } = req.body;

    // Check if vertical already exists
    const existing = await Vertical.findOne({ vertical_name });
    if (existing) {
      return res.status(409).json({ message: 'Vertical already exists' });
    }

    // Create new vertical
    const vertical = await Vertical.create({ vertical_name });
    res.status(201).json({ message: 'Vertical created successfully', vertical });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create vertical', error: err.message });
  }
};

// Get all verticals
exports.getAllVerticals = async (req, res) => {
  try {
    const verticals = await Vertical.find();
    res.json(verticals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch verticals', error: err.message });
  }
};

// Get a single vertical by ID
exports.getVerticalById = async (req, res) => {
  try {
    const vertical = await Vertical.findById(req.params.id);
    if (!vertical) return res.status(404).json({ message: 'Vertical not found' });
    res.json(vertical);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vertical', error: err.message });
  }
};

// Update vertical
exports.updateVertical = async (req, res) => {
  try {
    const { vertical_name } = req.body;
    const updated = await Vertical.findByIdAndUpdate(
      req.params.id,
      { vertical_name },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Vertical not found' });
    res.json({ message: 'Vertical updated successfully', updated });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update vertical', error: err.message });
  }
};

// Delete vertical
exports.deleteVertical = async (req, res) => {
  try {
    const deleted = await Vertical.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Vertical not found' });
    res.json({ message: 'Vertical deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete vertical', error: err.message });
  }
};

// Check if vertical exists by name
exports.checkVertical = async (req, res) => {
  try {
    const { vertical_name } = req.params;
    const exists = await Vertical.findOne({ vertical_name });
    res.json({ exists: !!exists });
  } catch (err) {
    res.status(500).json({ message: 'Error checking vertical', error: err.message });
  }
};
