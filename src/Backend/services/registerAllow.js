/** After email OTP is verified, allow /register/complete for this email for 15 minutes */
const WINDOW_MS = 15 * 60 * 1000;
/** @type {Map<string, number>} email -> expiresAt */
const registerAllowedUntil = new Map();

function setEmailVerifiedForRegister(email) {
  registerAllowedUntil.set(email, Date.now() + WINDOW_MS);
}

function canCompleteRegister(email) {
  const until = registerAllowedUntil.get(email);
  if (!until || Date.now() > until) {
    registerAllowedUntil.delete(email);
    return false;
  }
  return true;
}

function clearEmailVerified(email) {
  registerAllowedUntil.delete(email);
}

module.exports = {
  setEmailVerifiedForRegister,
  canCompleteRegister,
  clearEmailVerified,
};
