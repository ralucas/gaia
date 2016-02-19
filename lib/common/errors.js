var fs = require('fs');
var path = require('path');

var statusCodes = fs.readFileSync(
  path.join(__dirname, 'status-codes.json'), 'utf-8');

function getErrorInfo(code) {
  return JSON.parse(statusCodes)
    .find(function(statusCode) {
      return statusCode.code == code;
    }); 
}

function parseErrorDescription(code) {
  var desc = JSON.parse(getErrorInfo(code).description);
  return desc  
    .replace('indicates that ', '')
    .replace(/^\w/, String.call.bind(desc.toUpperCase));
}

function errorResponse(code) {
  var description = parseErrorDescription(code);
  return Object.assign({},
    getErrorInfo(code),
    { description: description }
  );
}

function errorHtmlResponse(code) {
  var error = errorResponse(code);
  return '<div style="text-align:center"><h1>' + 
    error.code + '</h1>' +
    '<h3>' + error.phrase + '</h3>' +
    '<h5>' + error.description + '</h5></div>';
}

function respond(code, req, res) {
  return res
    .status(code)
    .set('Content-Type', 'text/html')
    .send(errorHtmlResponse(code));
}

module.exports = {
  respond: respond
};
