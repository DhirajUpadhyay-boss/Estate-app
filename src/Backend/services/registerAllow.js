/** After OTP is verified, allow /register/complete for this phone for a short time */
const WINDOW_MS = 15 * 60 * 1000;
/** @type {Map<string, number>} phone -> expiresAt */
const registerAllowedUntil = new Map();

function setPhoneVerifiedForRegister(phone) {
  registerAllowedUntil.set(phone, Date.now() + WINDOW_MS);
}

function canCompleteRegister(phone) {
  const until = registerAllowedUntil.get(phone);
  if (!until || Date.now() > until) {
    registerAllowedUntil.delete(phone);
    return false;
  }
  return true;
}

function clearPhoneVerified(phone) {
  registerAllowedUntil.delete(phone);
}

module.exports = {
  setPhoneVerifiedForRegister,
  canCompleteRegister,
  clearPhoneVerified,
};
