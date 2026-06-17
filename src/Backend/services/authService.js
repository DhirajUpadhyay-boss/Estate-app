const bcrypt = require('bcrypt');
const User = require('../models/User');
const { signToken } = require('../config/jwt');
const HttpError = require('../utils/httpError');
const { setOtp, consumeOtp, generateSixDigitCode } = require('./otpStore');
const { setEmailVerifiedForRegister, canCompleteRegister, clearEmailVerified } = require('./registerAllow');
const sendOtpEmail = require('../utils/sendOtpEmail');
const checkGmailExists = require('../utils/checkGmailExists');

function normalizeEmail(email) {
  return String(email || '').toLowerCase().trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Only allow Gmail addresses — enforced on all OTP send calls
function isGmailAddress(email) {
  return email.endsWith('@gmail.com');
}

function toPublicUser(userDoc) {
  return {
    id: userDoc._id.toString(),
    name: userDoc.name,
    email: userDoc.email || '',
  };
}

function issueToken(userDoc) {
  const pub = toPublicUser(userDoc);
  const token = signToken({ sub: pub.id, email: pub.email });
  return { user: pub, token };
}

// ─── REGISTER ────────────────────────────────────────────────────────────────

async function sendRegisterOtp(rawEmail) {
  const email = normalizeEmail(rawEmail);
  if (!isValidEmail(email)) throw new HttpError(400, 'Enter a valid email address.');
  if (!isGmailAddress(email)) throw new HttpError(400, 'Only Gmail addresses (@gmail.com) are accepted.');

  const existing = await User.findOne({ email });
  if (existing) throw new HttpError(409, 'This email is already registered. Please login.');

  // Check if this Gmail inbox actually exists before sending OTP
  const gmailExists = await checkGmailExists(email);
  if (!gmailExists) {
    throw new HttpError(400, `The Gmail address "${email}" does not exist. Please enter a real Gmail account.`);
  }

  const code = generateSixDigitCode();
  setOtp('register', email, code);

  try {
    await sendOtpEmail(email, code, 'register');
    console.log(`[OTP register] ${email} → ${code}`);
  } catch (mailErr) {
    setOtp('register', email, '______');
    console.error(`[OTP register] Failed to send to ${email}:`, mailErr.message);
    throw new HttpError(400, 'Could not deliver email to this address. Please check the Gmail address and try again.');
  }

  return { message: 'OTP sent to your Gmail. Check your inbox.' };
}

async function verifyRegisterOtp({ email: rawEmail, code }) {
  const email = normalizeEmail(rawEmail);
  if (!isValidEmail(email)) throw new HttpError(400, 'Invalid email address.');
  if (!code || String(code).trim().length !== 6) throw new HttpError(400, 'Enter the 6-digit OTP.');

  const existing = await User.findOne({ email });
  if (existing) throw new HttpError(409, 'This email is already registered. Please login.');

  if (!consumeOtp('register', email, String(code).trim())) {
    throw new HttpError(400, 'Invalid or expired OTP. Please request a new one.');
  }

  setEmailVerifiedForRegister(email);
  return { verified: true, message: 'Email verified. Complete your profile.' };
}

async function completeRegister({ email: rawEmail, name, password, termsAccepted }) {
  const email = normalizeEmail(rawEmail);
  if (!isValidEmail(email)) throw new HttpError(400, 'Invalid email address.');

  if (!name || typeof name !== 'string' || !name.trim()) {
    throw new HttpError(400, 'Name is required.');
  }
  if (!password || String(password).length < 6) {
    throw new HttpError(400, 'Password must be at least 6 characters.');
  }
  if (termsAccepted !== true) {
    throw new HttpError(400, 'You must accept the Terms & Conditions.');
  }

  const existing = await User.findOne({ email });
  if (existing) throw new HttpError(409, 'This email is already registered.');

  if (!canCompleteRegister(email)) {
    throw new HttpError(400, 'Email not verified or session expired. Go back and verify OTP again.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    name: name.trim(),
    password: hashedPassword,
    termsAcceptedAt: new Date(),
  });

  clearEmailVerified(email);
  return issueToken(user);
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────

async function sendLoginOtp(rawEmail) {
  const email = normalizeEmail(rawEmail);
  if (!isValidEmail(email)) throw new HttpError(400, 'Enter a valid email address.');
  if (!isGmailAddress(email)) throw new HttpError(400, 'Only Gmail addresses (@gmail.com) are accepted.');

  const user = await User.findOne({ email });
  if (!user) throw new HttpError(404, 'No account found with this email. Please register first.');

  const code = generateSixDigitCode();
  setOtp('login', email, code);

  try {
    await sendOtpEmail(email, code, 'login');
    console.log(`[OTP login] ${email} → ${code}`);
  } catch (mailErr) {
    setOtp('login', email, '______'); // invalidate
    console.error(`[OTP login] Failed to send to ${email}:`, mailErr.message);
    throw new HttpError(400, 'Could not deliver email. Please check your Gmail address and try again.');
  }

  return { message: 'OTP sent to your Gmail. Check your inbox.' };
}

async function verifyLoginOtp({ email: rawEmail, code }) {
  const email = normalizeEmail(rawEmail);
  if (!isValidEmail(email)) throw new HttpError(400, 'Invalid email address.');
  if (!code || String(code).trim().length !== 6) throw new HttpError(400, 'Enter the 6-digit OTP.');

  const user = await User.findOne({ email });
  if (!user) throw new HttpError(404, 'No account found with this email.');

  if (!consumeOtp('login', email, String(code).trim())) {
    throw new HttpError(400, 'Invalid or expired OTP. Please request a new one.');
  }

  return issueToken(user);
}

// ─── PROFILE ─────────────────────────────────────────────────────────────────

async function getUserById(userId) {
  const user = await User.findById(userId);
  if (!user) throw new HttpError(404, 'User not found');
  return toPublicUser(user);
}

async function updateProfile(userId, { name, email: rawEmail }) {
  const user = await User.findById(userId);
  if (!user) throw new HttpError(404, 'User not found');

  if (name != null) {
    if (!name.trim()) throw new HttpError(400, 'Name cannot be empty.');
    user.name = name.trim();
  }

  if (rawEmail !== undefined) {
    const trimmed = normalizeEmail(rawEmail);
    if (trimmed === '') {
      user.email = null;
    } else {
      if (!isValidEmail(trimmed)) throw new HttpError(400, 'Invalid email format.');
      const taken = await User.findOne({ email: trimmed, _id: { $ne: user._id } });
      if (taken) throw new HttpError(409, 'Email already in use.');
      user.email = trimmed;
    }
  }

  await user.save();
  return toPublicUser(user);
}

module.exports = {
  sendRegisterOtp,
  verifyRegisterOtp,
  completeRegister,
  sendLoginOtp,
  verifyLoginOtp,
  getUserById,
  updateProfile,
  toPublicUser,
};
