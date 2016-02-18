var http = require('http');
var express = require('express');
var bluebird = require('bluebird');
var app = express();
var server = http.createServer(app);
var port = 8001;

var logger = require('morgan');
var bodyParser = require('body-parser');
var errors = require('./lib/common/errors');

var v1Routes = require('./lib/routes/v1');

app.use(logger('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/v1', v1Routes);

// Catch all undefined routes and return a 404
app.use(function(req, res) {
  res
    .status(404)
    .set('Content-Type', 'text/html')
    .send(errors.errorHtmlResponse(404));
});

server.listen(port, function () {
  console.log('Server listening on port %d', port);
});

module.exports = app;
