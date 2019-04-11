'use strict';
module.exports = function(app) {
  var eaiController = require('../controllers/eaiController');

  app.route('/api/example')
    .get(eaiController.example);

  app.route('/api/capitalWeather')
    .get(eaiController.getCapitalWeather);
};
