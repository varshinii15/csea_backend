const AdminUser = require('../models/AdminUser.js');
const { verifyGoogleToken } = require('../utils/googleOAuth.js');
const { generateToken } = require('../utils/tokenUtils.js');
const validateSchema = require('../middleware/validateSchema.js');


const registerSchema = {
  type: 'object',
  required: ['google_auth'],
  properties: {
    google_auth: {
      type: 'object',
      required: ['google_id_token', 'email', 'role'],
      properties: {
        google_id_token: { type: 'string', minLength: 1 },
        email: {
          type: 'string',
          pattern: '^(csea\\.cse@psgtech\\.ac\\.in|[0-9]{2}[zn][0-9]{3}@psgtech\\.ac\\.in)$'
        },
        role: { type: 'string', enum: ['admin', 'member'] }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

const loginSchema = {
  type: 'object',
  required: ['google_auth'],
  properties: {
    google_auth: {
      type: 'object',
      required: ['email'],
      properties: {
        email: {
          type: 'string',
          pattern: '^(csea\\.cse@psgtech\\.ac\\.in|[0-9]{2}[zn][0-9]{3}@psgtech\\.ac\\.in)$'
        }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

const updateSchema = {
  type: 'object',
  properties: {
    google_auth: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          pattern: '^(csea\\.cse@psgtech\\.ac\\.in|[0-9]{2}[zn][0-9]{3}@psgtech\\.ac\\.in)$'
        },
        google_id_token: { type: 'string' },
        role: { type: 'string', enum: ['admin', 'member'] }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

const validateTokenSchema = {
  type: 'object',
  required: ['google_id_token'],
  properties: {
    google_id_token: { type: 'string', minLength: 1 }
  },
  additionalProperties: false
};

exports.register = async (req, res) => {
  const { valid, errors } = validateSchema(registerSchema)(req.body);
  if (!valid) return res.status(400).json({ message: 'Validation failed', errors });

  const { google_auth } = req.body;
  try {
    const payload = await verifyGoogleToken(google_auth.google_id_token);
    if (payload.email !== google_auth.email)
      return res.status(400).json({ message: 'Email mismatch in token' });

    const existing = await AdminUser.findOne({ 'google_auth.email': google_auth.email });
    if (existing) return res.status(409).json({ message: 'User already registered' });

    const user = await AdminUser.create({ google_auth });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(401).json({ message: 'Invalid Google ID token', error: err.message });
  }
};


exports.login = async (req, res) => {
  const { valid, errors } = validateSchema(loginSchema)(req.body);
  if (!valid) return res.status(400).json({ message: 'Validation failed', errors });

  const { google_auth } = req.body;
  const user = await AdminUser.findOne({ 'google_auth.email': google_auth.email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = generateToken(user._id);
  res.json({ token });
};


exports.me = async (req, res) => {
  const user = await AdminUser.findById(req.user.id);
  res.json(user);
};

exports.logout = async (req, res) => {
  res.status(200).json({ message: 'Logged out (client should delete token)' });
};

exports.update = async (req, res) => {
  const { valid, errors } = validateSchema(updateSchema)(req.body);
  if (!valid) return res.status(400).json({ message: 'Validation failed', errors });

  const updated = await AdminUser.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.json(updated);
};



exports.delete = async (req, res) => {
  await AdminUser.findByIdAndDelete(req.user.id);
  res.json({ message: 'Account deleted' });
};

exports.roles = (req, res) => {
  res.json(['admin', 'member']);
};

exports.validate = async (req, res) => {
  const { valid, errors } = validateSchema(validateTokenSchema)(req.body);
  if (!valid) return res.status(400).json({ message: 'Validation failed', errors });

  const { google_id_token } = req.body;
  try {
    const payload = await verifyGoogleToken(google_id_token);
    const role = payload.email === 'csea.cse@psgtech.ac.in' ? 'admin' : 'member';
    res.json({ email: payload.email, role });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};



exports.check = async (req, res) => {
  const user = await AdminUser.findOne({ 'google_auth.email': req.params.email });
  res.json({ exists: !!user });
};