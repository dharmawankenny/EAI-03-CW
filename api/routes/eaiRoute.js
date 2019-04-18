'use strict';
module.exports = function(app) {
  var eaiController = require('../controllers/eaiController');
  
  // this is routing definitions for the 3 api we made in the controllers
  // this config made the controller function we make
  // accessible via http protocol.
 
  app.route('/api/getAllCountries')
    .get(eaiController.getAllCountries);

  app.route('/api/capitalWeather')
    .get(eaiController.getCapitalWeather);

  app.route('/api/forecastWeather')
    .get(eaiController.getForecastWeather);
};
