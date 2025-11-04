const Member = require('../models/Member.js');

exports.getAll = async (req, res) => {
  const members = await Member.find({ vertical_id: req.params.verticalId });
  res.json(members);
};

exports.create = async (req, res) => {
  const member = await Member.create({ ...req.body, vertical_id: req.params.verticalId });
  res.status(201).json(member);
};

exports.getOne = async (req, res) => {
  const member = await Member.findOne({ _id: req.params.memberId, vertical_id: req.params.verticalId });
  if (!member) return res.status(404).json({ message: 'Member not found' });
  res.json(member);
};

exports.update = async (req, res) => {
  const updated = await Member.findByIdAndUpdate(req.params.memberId, req.body, { new: true });
  res.json(updated);
};

exports.delete = async (req, res) => {
  await Member.findByIdAndDelete(req.params.memberId);
  res.json({ message: 'Member deleted' });
};