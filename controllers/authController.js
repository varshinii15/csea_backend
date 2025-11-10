// ...existing code...
const AdminUser = require('../models/AdminUser.js');
const { verifyGoogleToken } = require('../utils/googleOAuth.js');
const { generateToken, verifyToken } = require('../utils/tokenUtils.js');

// Register
// ...existing code...
exports.register = async (req, res) => {
  try {
    const { google_auth } = req.body;
    if (!google_auth?.google_id_token || !google_auth?.email) {
      return res.status(400).json({ error: 'google_id_token and email required' });
    }
    const { google_id_token, email } = google_auth;
    const payload = await verifyGoogleToken(google_id_token);
    if (!payload.email_verified) return res.status(401).json({ error: 'Email not verified by Google' });
    if (payload.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(401).json({ error: 'Email mismatch in token' });
    }

    const user = await AdminUser.create({
      google_auth: { email: email.toLowerCase(), role: 'member' },
      googleSub: payload.sub || undefined
    });

    const token = generateToken(user._id, { role: user.google_auth.role });
    res.status(201).json({ message: 'User registered successfully', token, role: user.google_auth.role });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'User already registered' });
    }
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};
// ...existing code...

// Login
exports.login = async (req, res) => {
  try {
    const { google_auth } = req.body;
    if (!google_auth?.google_id_token || !google_auth?.email) {
      return res.status(400).json({ error: 'google_id_token and email required' });
    }
    const { google_id_token, email } = google_auth;
    const payload = await verifyGoogleToken(google_id_token);
    if (!payload.email_verified) return res.status(401).json({ error: 'Email not verified by Google' });
    if (payload.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(401).json({ error: 'Email mismatch in token' });
    }
    const user = await AdminUser.findOne({ 'google_auth.email': email.toLowerCase() });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.googleSub && payload.sub) {
      user.googleSub = payload.sub;
      await user.save();
    }

    const token = generateToken(user._id, { role: user.google_auth.role });
    res.status(200).json({ message: 'Login successful', token, role: user.google_auth.role });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

// Me
exports.me = async (req, res) => {
  try {
    const user = await AdminUser.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user', details: err.message });
  }
};

// Update (email change requires fresh Google token)
exports.update = async (req, res) => {
  try {
    const { google_auth } = req.body;
    if (!google_auth?.email || !google_auth?.google_id_token) {
      return res.status(400).json({ error: 'email and google_id_token required' });
    }
    const payload = await verifyGoogleToken(google_auth.google_id_token);
    if (!payload.email_verified) return res.status(401).json({ error: 'Email not verified by Google' });
    if (payload.email.toLowerCase() !== google_auth.email.toLowerCase()) {
      return res.status(401).json({ error: 'Email token verification failed' });
    }

    const updatedUser = await AdminUser.findByIdAndUpdate(
      req.user.id,
      { $set: { 'google_auth.email': google_auth.email.toLowerCase() } },
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: 'Update failed', details: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const deleted = await AdminUser.findByIdAndDelete(req.user.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Deletion failed', details: err.message });
  }
};

// Roles
exports.roles = (_req, res) => {
  res.json(['admin', 'member']);
};

// Validate token
exports.validate = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(400).json({ error: 'Missing Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    const user = await AdminUser.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ valid: true, email: user.google_auth.email, role: user.google_auth.role });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token', details: err.message });
  }
};

// Check existence by email
exports.check = async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const user = await AdminUser.findOne({ 'google_auth.email': email });
    res.json({ exists: !!user });
  } catch (err) {
    res.status(500).json({ error: 'Check failed', details: err.message });
  }
};

// Logout (client side token discard)
exports.logout = (_req, res) => {
  res.json({ message: 'Logged out (client must discard token)' });
};