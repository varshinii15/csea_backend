const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const validateSchema = require('../middleware/validateSchema.js');

const EMAIL_REGEX = '^(csea\\.cse@psgtech\\.ac\\.in|[0-9]{2}[zn][0-9]{3}@psgtech\\.ac\\.in)$';

const googleAuthBase = {
  type: 'object',
  properties: {
    google_id_token: { type: 'string', minLength: 20 },
    email: { type: 'string', pattern: EMAIL_REGEX }
  },
  required: ['google_id_token', 'email'],
  additionalProperties: false
};

const registerSchema = { type: 'object', properties: { google_auth: googleAuthBase }, required: ['google_auth'], additionalProperties: false };
const loginSchema = registerSchema;

const updateSchema = {
  type: 'object',
  properties: {
    google_auth: {
      type: 'object',
      properties: {
        email: { type: 'string', pattern: EMAIL_REGEX },
        google_id_token: { type: 'string', minLength: 20 }
      },
      required: ['email', 'google_id_token'],
      additionalProperties: false
    }
  },
  required: ['google_auth'],
  additionalProperties: false
};

const checkEmailParamsSchema = {
  type: 'object',
  properties: { email: { type: 'string', pattern: EMAIL_REGEX } },
  required: ['email'],
  additionalProperties: false
};

// Public
router.post('/register', validateSchema(registerSchema), auth.register);
router.post('/login', validateSchema(loginSchema), auth.login);

// Protected
router.get('/me', authMiddleware, auth.me);
router.put('/update', authMiddleware, validateSchema(updateSchema), auth.update);
router.delete('/delete', authMiddleware, auth.delete);
router.get('/roles', authMiddleware, auth.roles);
router.get('/validate', authMiddleware, auth.validate);
router.get('/check/:email', validateSchema(checkEmailParamsSchema, 'params'), auth.check);
router.post('/logout', authMiddleware, auth.logout);

module.exports = router;