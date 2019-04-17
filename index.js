const express = require('express'),
  path = require('path'),
  sslRedirect = require('heroku-ssl-redirect'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  apiRoutes = require('./api/routes/eaiRoute'),
  server = express(),
  PORT = process.env.PORT || 5000;

// enable ssl redirect
server.use(sslRedirect());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

server.options('*', cors())
apiRoutes(server);

server
  .use('/', express.static(path.join(__dirname, 'client')))
  .get('*', (req, res) => res.sendFile(path.join(__dirname, 'client/index.html')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

console.log('EAI CW 03 server started on: ' + PORT);
