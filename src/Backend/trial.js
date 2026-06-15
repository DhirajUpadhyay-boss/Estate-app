// const http = require('http');

// let PORT = process.env.PORT || 3015;
// const fs= require('fs');


// let requestHandler = http.createServer((req, res) => {
 
//   if (req.url === '/') {
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Page</title></head>');
//     res.write('<body><h1>Welcome to Jumanjii!!</h1></body>');
//     res.write('</html>');
//     return res.end();
//   }
//   if (req.url === '/form') {
//     res.setHeader('Content-Type', 'text/html; charset=utf-8');
//     res.write('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Form</title></head>');
//     res.write('<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;background:linear-gradient(135deg,#1e3a5f 0%,#0f172a 100%);">');
//     res.write('<div style="width:100%;max-width:420px;padding:24px;">');
//     res.write('<h1 style="margin:0 0 20px;color:#f8fafc;font-size:1.5rem;font-weight:600;text-align:center;">Welcome to the homepage</h1>');
//     res.write('<form action = "/submitDetails"  method="POST" style="background:#fff;border-radius:12px;padding:28px 24px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.35);">');
//     res.write('<p style="margin:0 0 16px;"><label style="display:block;font-size:0.85rem;font-weight:600;color:#334155;margin-bottom:6px;">Username</label><input type="text" name="username" required style="width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:1rem;outline:none;" placeholder="Enter username" /></p>');
//     res.write('<p style="margin:0 0 16px;"><label style="display:block;font-size:0.85rem;font-weight:600;color:#334155;margin-bottom:6px;">Password</label><input type="password" name="password" required style="width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:1rem;outline:none;" placeholder="Enter password" /></p>');
//     res.write('<fieldset style="margin:0 0 20px;padding:12px 14px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;"><legend style="font-size:0.85rem;font-weight:600;color:#334155;padding:0 6px;">Gender</legend>');
//     res.write('<label style="display:inline-flex;align-items:center;margin-right:14px;font-size:0.95rem;color:#475569;cursor:pointer;"><input type="radio" name="gender" value="male" required style="margin-right:6px;" /> Male</label>');
//     res.write('<label style="display:inline-flex;align-items:center;margin-right:14px;font-size:0.95rem;color:#475569;cursor:pointer;"><input type="radio" name="gender" value="female" style="margin-right:6px;" /> Female</label>');
//     res.write('<label style="display:inline-flex;align-items:center;font-size:0.95rem;color:#475569;cursor:pointer;"><input type="radio" name="gender" value="other" style="margin-right:6px;" /> Other</label>');
//     res.write('</fieldset>');
//     res.write('<button type="submit" style="width:100%;padding:12px 16px;border:none;border-radius:8px;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;font-size:1rem;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(37,99,235,0.4);">Submit</button>');
//     res.write('</form></div></body></html>');
//     return res.end();
//   }
//   else if (req.url.split('?')[0].toLowerCase() === '/submitdetails' && req.method === 'POST') {
//     const chunks = [];
//     req.on('data', (chunk) => {
//       chunks.push(chunk);
//       console.log('chunk:', chunk.toString());
//     });
//     req.on('end', () => {
//       const body = Buffer.concat(chunks).toString();
//       console.log('full body:', body);
//       fs.writeFileSync('user.txt', 'Dhiraj-Upadhyay');
//       res.writeHead(302, { Location: '/' });
//       res.end();
//     });
//     req.on('error', (err) => {
//       console.error(err);
//       res.writeHead(500);
//       res.end();
//     });
//     return;
//   }

//   res.writeHead(404);
//   res.end('<h1> 404 Not-Found</h1>');
// });

// module.exports= requestHandler;