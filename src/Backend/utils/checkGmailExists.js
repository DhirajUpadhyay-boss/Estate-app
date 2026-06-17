/**
 * Verifies if a Gmail address actually exists by doing an SMTP RCPT TO handshake
 * directly with Gmail's mail server — without sending any email.
 *
 * Process:
 *   1. Connect to Gmail's SMTP server (aspmx.l.google.com:25)
 *   2. Say HELO
 *   3. Issue MAIL FROM (fake sender)
 *   4. Issue RCPT TO (the address we're checking)
 *   5. Read the response:
 *      - 250 = address exists ✅
 *      - 550 = address does not exist ❌
 *   6. Quit immediately — no email is ever sent
 */
const net = require('net');

function checkGmailExists(email) {
  return new Promise((resolve) => {
    const timeout = 8000; // 8 seconds max
    let resolved = false;

    function done(result) {
      if (resolved) return;
      resolved = true;
      client.destroy();
      resolve(result);
    }

    const client = net.createConnection({ host: 'aspmx.l.google.com', port: 25 });

    client.setTimeout(timeout);
    client.setEncoding('utf8');

    let stage = 0;
    let buffer = '';

    client.on('connect', () => {
      // Connection established — Gmail will send 220 banner
    });

    client.on('data', (data) => {
      buffer += data;

      // Wait for complete response line ending in \r\n
      if (!buffer.includes('\r\n')) return;

      const line = buffer.trim();
      buffer = '';

      if (stage === 0 && line.startsWith('220')) {
        // Got banner — say HELO
        stage = 1;
        client.write('HELO check.example.com\r\n');

      } else if (stage === 1 && line.startsWith('250')) {
        // HELO accepted — send MAIL FROM
        stage = 2;
        client.write('MAIL FROM:<noreply@check.example.com>\r\n');

      } else if (stage === 2 && line.startsWith('250')) {
        // MAIL FROM accepted — check RCPT TO (the actual test)
        stage = 3;
        client.write(`RCPT TO:<${email}>\r\n`);

      } else if (stage === 3) {
        client.write('QUIT\r\n');

        if (line.startsWith('250') || line.startsWith('251')) {
          // 250/251 = address exists
          done(true);
        } else if (line.startsWith('550') || line.startsWith('551') || line.startsWith('553')) {
          // 550 = mailbox does not exist
          done(false);
        } else {
          // Any other response (421, 452, etc.) = inconclusive, allow through
          console.warn(`[checkGmailExists] Inconclusive SMTP response for ${email}: ${line}`);
          done(true);
        }

      } else if (line.startsWith('5')) {
        // Any 5xx at any earlier stage = something wrong, allow through
        done(true);
      }
    });

    client.on('timeout', () => {
      // Timeout — many servers block port 25 outbound (ISP/hosting restriction)
      // Fall back to allowing the send
      console.warn(`[checkGmailExists] SMTP check timed out for ${email} — allowing send`);
      done(true);
    });

    client.on('error', (err) => {
      // Port 25 blocked by ISP or firewall — fall back to allowing
      console.warn(`[checkGmailExists] SMTP check failed for ${email}: ${err.message} — allowing send`);
      done(true);
    });

    client.on('close', () => {
      if (!resolved) done(true); // fallback
    });
  });
}

module.exports = checkGmailExists;
