const mongoose = require('mongoose');

/**
 * Phone-first users (OTP auth). Email optional. Password unused for OTP flow (legacy field).
 * If you had old email+password users, drop the `users` collection or migrate before deploy.
 */
const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      default: null,
      lowercase: true,
      trim: true,
      sparse: true,
      unique: true,
    },
    password: { type: String, select: false, default: null },
    termsAcceptedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
