const { OAuth2Client } = require('google-auth-library');

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID is not set in .env');
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    return {
      email: payload.email,
      sub: payload.sub,
      email_verified: payload.email_verified
      // name/picture omitted since schema doesn’t store them
    };
  } catch (err) {
    throw new Error('Invalid Google ID token');
  }
};