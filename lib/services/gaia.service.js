var httpRequest = require('../common/http-request.js');

function GaiaService(config) {
  this.config = config;
}

function handleResponse(response) {
  return JSON.parse(response.body);
}

// Throw the error up to be caught
// at the handler stage
function handleError(error) {
  throw new Error(error);
}

GaiaService.prototype.get = function get(endpoint) {
  var requestUrl = this.config.baseUrl + endpoint;
  return httpRequest(requestUrl, 'get')
    .then(handleResponse)
    .catch(handleError);
};

module.exports = GaiaService;
