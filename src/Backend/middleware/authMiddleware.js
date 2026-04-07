const { verifyToken } = require('../config/jwt');
const HttpError = require('../utils/httpError');

/**
 * Requires Authorization: Bearer <jwt>
 * Sets req.auth = { sub, phone, email }
 */
function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new HttpError(401, 'Authentication required');
    }
    const payload = verifyToken(token);
    req.auth = {
      sub: payload.sub,
      phone: payload.phone,
      email: payload.email || '',
    };
    next();
  } catch (err) {
    if (err instanceof HttpError) {
      return next(err);
    }
    next(new HttpError(401, 'Invalid or expired token'));
  }
}

module.exports = authMiddleware;
