const express = require('express'),
  path = require('path'),
  sslRedirect = require('heroku-ssl-redirect'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  apiRoutes = require('./api/routes/eaiRoute'),
  server = express(),
  PORT = process.env.PORT || 5000;

// Server base configs, ssl redirection, CORS header, etc.
server.use(sslRedirect());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

// allow all CORS, this is not recommended but it is a
// proof of concept app anyway so its okay
server.options('*', cors())

// register API routes defined in the eaiRoute file
apiRoutes(server);

// serve client app on index and any other URL not specified.
// this serves the bundled by Parcel Bundler, contains
// react app made on the client directory, when built
// it will be bundled to dist folder and the server
// will serve bundled static files as a client.
server
  .use('/', express.static(path.join(__dirname, 'client')))
  .get('*', (req, res) => res.sendFile(path.join(__dirname, 'client/index.html')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// simple logger to display status.
console.log('EAI CW 03 server started on: ' + PORT);
