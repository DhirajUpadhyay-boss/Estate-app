const mongoose = require('mongoose');

/**
 * Email-first users. Phone is now optional (legacy).
 * Auth flow: email OTP to verify → complete with name + password.
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: { type: String, required: true, trim: true },
    password: { type: String, select: false, default: null },
    // Legacy phone field — kept so old records don't break
    phone: { type: String, default: null, sparse: true, trim: true },
    termsAcceptedAt: { type: Date, default: null },
    emailVerified: { type: Boolean, default: true }, // true because OTP verified before creation
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
