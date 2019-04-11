require('babel-register');
require('babel-polyfill');

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
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

console.log('Mock RESTful API server started on: ' + PORT);
