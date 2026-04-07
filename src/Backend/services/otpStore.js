const crypto = require('crypto');

const TTL_MS = 5 * 60 * 1000;
/** @type {Map<string, { code: string, expiresAt: number }>} */
const store = new Map();

function key(purpose, phone) {
  return `${purpose}:${phone}`;
}

function setOtp(purpose, phone, code) {
  store.set(key(purpose, phone), {
    code,
    expiresAt: Date.now() + TTL_MS,
  });
}

/**
 * @returns {boolean} true if code matched and entry removed
 */
function consumeOtp(purpose, phone, inputCode) {
  const k = key(purpose, phone);
  const entry = store.get(k);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    store.delete(k);
    return false;
  }
  if (entry.code !== String(inputCode).trim()) return false;
  store.delete(k);
  return true;
}

function peekOtpForDev(purpose, phone) {
  return store.get(key(purpose, phone));
}

function generateSixDigitCode() {
  return String(crypto.randomInt(100000, 1000000));
}

module.exports = {
  setOtp,
  consumeOtp,
  generateSixDigitCode,
  peekOtpForDev,
};
