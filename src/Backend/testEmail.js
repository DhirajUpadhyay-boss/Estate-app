/**
 * Run this once to verify nodemailer + Gmail App Password works:
 *   node testEmail.js
 * 
 * You should receive a test email at EMAIL_USER within 30 seconds.
 */
require('dotenv').config();
const nodemailer = require('nodemailer');

async function test() {
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ loaded (' + process.env.EMAIL_PASS.length + ' chars)' : '❌ NOT FOUND');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    console.log('\nVerifying credentials with Gmail...');
    await transporter.verify();
    console.log('✅ Credentials OK — Gmail accepted the App Password\n');

    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: `"Estate App Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // sends to yourself
      subject: 'Estate App — Email Test ✅',
      html: `
        <div style="font-family:Arial,sans-serif;padding:24px;background:#f9fafb;border-radius:8px;">
          <h2 style="color:#111827;">It works! 🎉</h2>
          <p style="color:#6b7280;">Your nodemailer + Gmail App Password setup is working correctly.</p>
          <div style="background:#111827;border-radius:8px;padding:20px;text-align:center;margin-top:16px;">
            <p style="color:#facc15;font-size:36px;font-weight:bold;letter-spacing:10px;margin:0;">123456</p>
            <p style="color:#9ca3af;font-size:12px;margin-top:8px;">Sample OTP</p>
          </div>
        </div>
      `,
    });
    console.log('✅ Email sent! Message ID:', info.messageId);
    console.log('Check your inbox at:', process.env.EMAIL_USER);
  } catch (err) {
    console.error('\n❌ Error:', err.message);
    if (err.message.includes('Invalid login') || err.message.includes('Username and Password')) {
      console.error('\n👉 FIX: Your App Password is wrong or 2FA is not enabled.');
      console.error('   1. Go to https://myaccount.google.com/apppasswords');
      console.error('   2. Create a new App Password → copy the 16 chars');
      console.error('   3. Paste it in .env as EMAIL_PASS (no spaces)');
    }
    if (err.message.includes('ECONNREFUSED') || err.message.includes('network')) {
      console.error('\n👉 FIX: Network issue. Check your internet connection.');
    }
  }
}

test();
