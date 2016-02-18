var GaiaService = require('./gaia.service');

// Constants
var BASE_URL = 'http://www.gaia.com/api/';

module.exports = {
  gaia: new GaiaService({baseUrl: BASE_URL})
};
