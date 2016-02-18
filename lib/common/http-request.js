var Promise = require('bluebird');
var request = Promise.promisify(require("request"));
Promise.promisifyAll(request);

module.exports = function httpRequest(uri, method) {
  return request({
    method: method,
    headers: {
      'Accept': 'application/json'
    },
    uri: uri 
  });
};
