require('dotenv').config(); // ensure env is loaded even if called directly
const nodemailer = require('nodemailer');

/**
 * Creates a fresh transporter each call so env vars are always read after dotenv loads.
 */
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // 16-char Gmail App Password, NOT your Gmail password
    },
  });
}

/**
 * Sends a 6-digit OTP email.
 * @param {string} toEmail  - recipient email
 * @param {string} code     - 6-digit OTP
 * @param {'register'|'login'} purpose
 */
async function sendOtpEmail(toEmail, code, purpose = 'register') {
  const label = purpose === 'login' ? 'Sign In' : 'Email Verification';
  const transporter = createTransporter();

  // Verify credentials before sending (catches bad App Password early)
  await transporter.verify();

  await transporter.sendMail({
    from: `"Estate App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Your ${label} OTP — ${code}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #f9fafb; border-radius: 12px;">
        <h2 style="color: #111827; margin-bottom: 8px;">Estate App</h2>
        <p style="color: #6b7280; margin-bottom: 24px;">Use the OTP below to complete your ${label.toLowerCase()}.</p>
        <div style="background: #111827; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <p style="color: #9ca3af; font-size: 14px; margin-bottom: 8px; letter-spacing: 1px; text-transform: uppercase;">Your OTP</p>
          <p style="color: #facc15; font-size: 40px; font-weight: bold; letter-spacing: 12px; margin: 0;">${code}</p>
        </div>
        <p style="color: #6b7280; font-size: 13px;">This OTP is valid for <strong>15 minutes</strong>. Do not share it with anyone.</p>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
  });

  console.log(`[EMAIL] OTP sent to ${toEmail}`);
}

module.exports = sendOtpEmail;
