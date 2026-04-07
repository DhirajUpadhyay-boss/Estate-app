const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/authService');

const sendRegisterOtp = asyncHandler(async (req, res) => {
  const result = await authService.sendRegisterOtp(req.body.phone);
  res.json(result);
});

const verifyRegisterOtp = asyncHandler(async (req, res) => {
  const result = await authService.verifyRegisterOtp(req.body);
  res.json(result);
});

const completeRegister = asyncHandler(async (req, res) => {
  const result = await authService.completeRegister(req.body);
  res.status(201).json(result);
});

const sendLoginOtp = asyncHandler(async (req, res) => {
  const result = await authService.sendLoginOtp(req.body.phone);
  res.json(result);
});

const verifyLoginOtp = asyncHandler(async (req, res) => {
  const result = await authService.verifyLoginOtp(req.body);
  res.json(result);
});

const logout = asyncHandler(async (req, res) => {
  res.json({ message: 'Logged out. Remove token on the client.' });
});

const me = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.auth.sub);
  res.json({ user });
});

const updateMe = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.auth.sub, req.body);
  res.json({ user });
});

module.exports = {
  sendRegisterOtp,
  verifyRegisterOtp,
  completeRegister,
  sendLoginOtp,
  verifyLoginOtp,
  logout,
  me,
  updateMe,
};
