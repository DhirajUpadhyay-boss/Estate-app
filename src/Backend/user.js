const http= require('http');
let PORT= process.env.PORT || 4000;
let  Userrequest  = require('./Trialserver') 
let Server= http.createServer( Userrequest)


Server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

