// Quick test — run: node testGmailCheck.js
const check = require('./utils/checkGmailExists');

async function run() {
  console.log('Testing Gmail existence check via SMTP...\n');

  const tests = [
    'dhirajupadhyay5277@gmail.com',   // real — should be true
    '123@gmail.com',                   // fake — should be false
    'xyzfakeabc99999@gmail.com',       // fake — should be false
  ];

  for (const email of tests) {
    const exists = await check(email);
    console.log(`${email} → ${exists ? '✅ EXISTS' : '❌ DOES NOT EXIST'}`);
  }
}

run();
