const User = require('../models/User');
const { signToken } = require('../config/jwt');
const HttpError = require('../utils/httpError');
const {
  setOtp,
  consumeOtp,
  generateSixDigitCode,
} = require('./otpStore');
const {
  setPhoneVerifiedForRegister,
  canCompleteRegister,
  clearPhoneVerified,
} = require('./registerAllow');

function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return null;
}

function toPublicUser(userDoc) {
  return {
    id: userDoc._id.toString(),
    name: userDoc.name,
    email: userDoc.email || '',
    phone: userDoc.phone,
  };
}

function issueToken(userDoc) {
  const pub = toPublicUser(userDoc);
  const token = signToken({
    sub: pub.id,
    phone: pub.phone,
    email: pub.email || '',
  });
  return { user: pub, token };
}

async function sendRegisterOtp(rawPhone) {
  const phone = normalizePhone(rawPhone);
  if (!phone) {
    throw new HttpError(400, 'Enter a valid 10-digit mobile number');
  }

  const existing = await User.findOne({ phone });
  if (existing) {
    throw new HttpError(409, 'This number is already registered. Please login.');
  }

  const code = generateSixDigitCode();
  setOtp('register', phone, code);
  console.log(`[OTP register] ${phone} → ${code} (dev only — use SMS in production)`);
  return { message: 'OTP sent. Check server console in development.' };
}

/** Step 1: verify OTP only; opens a short window for step 2 complete */
async function verifyRegisterOtp(body) {
  const phone = normalizePhone(body.phone);
  if (!phone) throw new HttpError(400, 'Invalid phone number');
  if (!body.code || String(body.code).trim().length !== 6) {
    throw new HttpError(400, 'Enter the 6-digit OTP');
  }

  const existing = await User.findOne({ phone });
  if (existing) {
    throw new HttpError(409, 'This number is already registered. Please login.');
  }

  if (!consumeOtp('register', phone, body.code)) {
    throw new HttpError(400, 'Invalid or expired OTP');
  }

  setPhoneVerifiedForRegister(phone);
  return { verified: true, message: 'Phone verified. You can complete your profile.' };
}

async function completeRegister(body) {
  const phone = normalizePhone(body.phone);
  if (!phone) throw new HttpError(400, 'Invalid phone number');

  const { name, termsAccepted } = body;
  if (!name || typeof name !== 'string' || !name.trim()) {
    throw new HttpError(400, 'Name is required');
  }
  if (termsAccepted !== true) {
    throw new HttpError(400, 'You must accept the Terms & Conditions');
  }

  const existing = await User.findOne({ phone });
  if (existing) {
    throw new HttpError(409, 'This number is already registered');
  }

  if (!canCompleteRegister(phone)) {
    throw new HttpError(
      400,
      'Phone not verified or session expired. Go back and verify OTP again.'
    );
  }

  let email = body.email;
  if (email != null && String(email).trim() !== '') {
    email = String(email).toLowerCase().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new HttpError(400, 'Invalid email format');
    }
    const emailTaken = await User.findOne({ email });
    if (emailTaken) throw new HttpError(409, 'Email already in use');
  } else {
    email = null;
  }

  const user = await User.create({
    phone,
    name: name.trim(),
    email,
    termsAcceptedAt: new Date(),
  });

  clearPhoneVerified(phone);
  return issueToken(user);
}

async function sendLoginOtp(rawPhone) {
  const phone = normalizePhone(rawPhone);
  if (!phone) {
    throw new HttpError(400, 'Enter a valid 10-digit mobile number');
  }

  const user = await User.findOne({ phone });
  if (!user) {
    throw new HttpError(404, 'No account with this number. Please register first.');
  }

  const code = generateSixDigitCode();
  setOtp('login', phone, code);
  console.log(`[OTP login] ${phone} → ${code} (dev only — use SMS in production)`);
  return { message: 'OTP sent. Check server console in development.' };
}

async function verifyLoginOtp(body) {
  const phone = normalizePhone(body.phone);
  if (!phone) throw new HttpError(400, 'Invalid phone number');
  if (!body.code || String(body.code).trim().length !== 6) {
    throw new HttpError(400, 'Enter the 6-digit OTP');
  }

  const user = await User.findOne({ phone });
  if (!user) {
    throw new HttpError(404, 'No account with this number');
  }

  if (!consumeOtp('login', phone, body.code)) {
    throw new HttpError(400, 'Invalid or expired OTP');
  }

  return issueToken(user);
}

async function getUserById(userId) {
  const user = await User.findById(userId);
  if (!user) throw new HttpError(404, 'User not found');
  return toPublicUser(user);
}

async function updateProfile(userId, { name, email }) {
  const user = await User.findById(userId);
  if (!user) throw new HttpError(404, 'User not found');

  if (name != null) {
    if (typeof name !== 'string' || !name.trim()) {
      throw new HttpError(400, 'Name cannot be empty');
    }
    user.name = name.trim();
  }

  if (email !== undefined) {
    const trimmed = String(email || '').trim();
    if (trimmed === '') {
      user.email = null;
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        throw new HttpError(400, 'Invalid email format');
      }
      const lower = trimmed.toLowerCase();
      const taken = await User.findOne({
        email: lower,
        _id: { $ne: user._id },
      });
      if (taken) throw new HttpError(409, 'Email already in use');
      user.email = lower;
    }
  }

  await user.save();
  return toPublicUser(user);
}

module.exports = {
  normalizePhone,
  sendRegisterOtp,
  verifyRegisterOtp,
  completeRegister,
  sendLoginOtp,
  verifyLoginOtp,
  getUserById,
  updateProfile,
  toPublicUser,
};
