<Technologies learned and applied:>
1. Node.js basics - Just understand event-driven, non-blocking I/O conceptually
2. Express routing - Straightforward to learn, directly replaces your dummy data
3. REST API structure - Natural complement to your React frontend
4. Middleware - Critical for Express; middleware pattern is fundamental
5. CORS - Essential for connecting your React frontend to backend
6. Request/Response lifecycle - You'll learn this naturally while building APIs
----------------------------------------------
<Complete-Backend>
What is Node.js (event-driven, non-blocking I/O)
Event loop,
Modules system (CommonJS vs ES modules),
File System (fs module),
Path & OS modules,
Process & environment variables,
Async programming (callbacks, promises, async/await)
Express routing
Middleware (important)
Request/Response lifecycle
Error handling middleware
REST API structure
MVC architecture in Node
JWT authentication
bcrypt password hashing
Cookies vs Tokens

CORS
Helmet security
Rate limiting
Input validation (Joi / express-validator)



-----------------[(Syllabus)Concepts-Of-NOde.js-to-learn]____________________________________



•  async/await — every database call and API call uses this
Event-loop:
•  ES Modules vs CommonJS — require() vs import, know both
•  Environment variables — process.env, dotenv package
•  Error handling — try/catch with async code

const http = require('http');

const DEFAULT_PORT = 3000;
const PORT = Number(process.env.PORT) || DEFAULT_PORT;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (req.url === '/About') {
    res.statusCode = 200;
    res.end('<html><h1>Hello, I am ready??</h1></html>');
    return;
  }

  res.statusCode = 404;
  res.end('<html><h1>404 - Not Found</h1></html>');
});

function listenWithFallback(port) {
  server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    const nextPort = (server.address()?.port || PORT) + 1;
    console.log(`Port is busy. Trying port ${nextPort}...`);
    listenWithFallback(nextPort);
    return;
  }
  throw err;
});

listenWithFallback(PORT);


------------------------------------------[Chunks-and-Buffers-in-React]_______________________________________
 # Chunks
 Sending data in form of packets[small-units] both for uploading and downloading.
 # Buffers
 Sends data in a sequential and organised manner, so that no data is lost.
 
 -----------------------------------------------[NPM-and-Scripts]______________________________________
npm init: Initialize a new-project.

-------------------------------------------[Types-of-Errors]:
1. [Syntax-Error]: error in writing the code. where you are not following syntax-rules properly.
2. [Runtime-Error]:  error that can be only caught on runtime,not compile-time.
----------------------------------------------------------------------------------

----------------------------------<Middleware-and-Routes>:_________________________________________________
Middlewares: Acts as a checker/Authenticiates, That request should be further proceeded.
Logics is broken down into small middlewares:
sequence of middleware is important.

[Every-middleware-is-assigned-for-a-particularly-Task.]
# Second task is only completed after First ones.

-----------------------<Express.js-starts>____________________________________________-
# Difference between app.get()and app.use()
app.use() mounts middleware that runs for incoming requests (optionally scoped to a path), and app.get(path, …) registers a handler that runs only for GET requests to that specific route.



-------------------------[MVC-concepts]
It is a architecture: helps in definiing the code-structure properly.
[Learning MVC helps you split routes/controllers, business logic/models, and responses/views so your Register, blogs, and properties code stays organized, easier to test, and simpler to grow without one giant file.]

----[Inner-working-between-Frontend-and-Backend]_____________________________________


<Why MVC: >It separates concerns — routes decides where the request goes, controller decides what logic runs, and seed/model holds the data — so each layer can be changed independently without breaking the others.

<What happens internally:> 
When axios.get('http://localhost:3055/api/research') fires, Express matches the URL to app.use('/api/research', researchRoutes) → router forwards GET / to getResearchItems in the controller → controller grabs the array from the seed file → sends it back as JSON via res.json().