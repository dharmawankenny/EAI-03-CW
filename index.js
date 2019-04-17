const express = require('express'),
  path = require('path'),
  sslRedirect = require('heroku-ssl-redirect'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  routes = require('./api/routes/eaiRoute'),
  app = express(),
  PORT = process.env.PORT || 5000;

// enable ssl redirect
app.use(sslRedirect());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.options('*', cors())
routes(app);

app
  .use('/', express.static(path.join(__dirname, 'dist')))
  .get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

console.log('Mock RESTful API server started on: ' + PORT);
