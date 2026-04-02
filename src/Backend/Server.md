
// Routes


------------------------- <Server for Real-Estate-Backend>______________________________________
1. 


------------------------------------------------------------------------------------
   <Raw-HTML-code in Express.js>
app.get('/api/research', (req, res) => {

  res.json(researchItems);
});

app.get('/api/news', (req, res) => {
   
res.json(newsItems);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});


app.use((req, res, next) => {
  console.log("Came-in-first-middleware", req.url, req.method);
   res.send('<h1>You can see me!!</h1>'); 
  next()
});

app.use((req, res, next) => {
  console.log("Came-in-second-middleware", req.url, req.method);
   res.send('<h1>Kya maii zinda hoon?!!</h1>'); 
  next();
});




 const Server = http.createServer(app);

// app.get('/Home',(req,res) => {
//  res.send('<h1>You can see me!!</h1>'); 
// }
// )


--------------------------------------<A-Form-handling using middlewares>
const express = require('express');
const http = require('http');
const app = express();
let PORT = process.env.PORT || 3055;

// Logging only — always call next() so later handlers can run
app.use((req, res, next) => {
  console.log('This is the Barrier', req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log('This is the second Barrier', req.url, req.method);
  next();
});

// Specific routes after global middleware (do not res.send for every path in app.use)
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Yugandaa!!</h1>');
});

app.get('/city', (req, res,next) => {
  console.log('Handling for contact', req.url, req.method);
  res.send('<h1>Welcome to Delhi!!</h1>');
  next()
});

app.get('/About-Us', (req, res,next) => {
  console.log('Handling for About', req.url, req.method);
  res.send('<h1>I am Monkey-D-Luffy, Searching One-Piece......</h1>');
  next()
});

app.get('/Contact-Us', (req, res,next) => {
  console.log('Handling for Contact', req.url, req.method);
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Contact</title>
</head>
<body>
  <h1>Contact</h1>
  <form action="/contact" method="POST">
    <p>
      <label for="name">Name</label><br />
      <input type="text" id="name" name="name" required />
    </p>
    <p>
      <label for="email">Email</label><br />
      <input type="email" id="email" name="email" required />
    </p>
    <p>
      <label for="message">Message</label><br />
      <textarea id="message" name="message" rows="5" cols="40" required></textarea>
    </p>
    <button type="submit">Send</button>
  </form>
</body>
</html>
`);
next();
});

app.post('/Contact-Us', (req, res,next) => {
  console.log('Handling for About', req.url, req.method);
  res.send('<h1>Zald hi milenge!!</h1>');
 
});


const Server = http.createServer(app);

Server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
