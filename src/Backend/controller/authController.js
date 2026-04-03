const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/authService');
const HttpError = require('../utils/httpError');

function validateRegisterBody(body) {
  const { name, email, password } = body || {};
  if (!name || typeof name !== 'string' || !name.trim()) {
    throw new HttpError(400, 'Name is required');
  }
  if (!email || typeof email !== 'string') {
    throw new HttpError(400, 'Email is required');
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    throw new HttpError(400, 'Password must be at least 8 characters');
  }
}

function validateLoginBody(body) {
  const { email, password } = body || {};
  if (!email || typeof email !== 'string') {
    throw new HttpError(400, 'Email is required');
  }
  if (!password || typeof password !== 'string') {
    throw new HttpError(400, 'Password is required');
  }
}

const register = asyncHandler(async (req, res) => {
  validateRegisterBody(req.body);
  const result = await authService.registerUser(req.body);
  res.status(201).json(result);
});

const login = asyncHandler(async (req, res) => {
  validateLoginBody(req.body);
  const result = await authService.loginUser(req.body);
  res.json(result);
});

/** Stateless JWT: client discards token; server has nothing to clear */
const logout = asyncHandler(async (req, res) => {
  res.json({ message: 'Logged out. Remove token on the client.' });
});

const me = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.auth.sub);
  res.json({ user });
});

module.exports = { register, login, logout, me };
