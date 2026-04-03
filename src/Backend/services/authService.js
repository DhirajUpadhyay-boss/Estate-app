const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/password');
const { signToken } = require('../config/jwt');
const HttpError = require('../utils/httpError');

function toPublicUser(userDoc) {
  return {
    id: userDoc._id.toString(),
    name: userDoc.name,
    email: userDoc.email,
  };
}

async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    throw new HttpError(409, 'Email already registered');
  }

  const hashed = await hashPassword(password);
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashed,
  });

  const publicUser = toPublicUser(user);
  const token = signToken({ sub: publicUser.id, email: publicUser.email });
  return { user: publicUser, token };
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
    '+password'
  );
  if (!user) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const ok = await comparePassword(password, user.password);
  if (!ok) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const publicUser = toPublicUser(user);
  const token = signToken({ sub: publicUser.id, email: publicUser.email });
  return { user: publicUser, token };
}

async function getUserById(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  return toPublicUser(user);
}

module.exports = { registerUser, loginUser, getUserById, toPublicUser };
