var assert = require('assert');

var app = require('../index.js');
var request = require('supertest');

describe('Gaia V1 Test', function() {

  this.timeout(5000);

  describe('GET /longest-preview-media-url', function() {
    it('should return json and 200 status', function(done) {
      request(app)
        .get('/v1/api/term/26681/longest-preview-media-url')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
    });

    it('should have correct properties', function(done) {
      request(app)
        .get('/v1/api/term/26681/longest-preview-media-url')
        .expect(function(res) {
          assert(Object.keys(res.body).length, 4);
          assert(typeof(res.body.previewDuration), 'number');
          assert(typeof(res.body.bcHLS), 'string');
        })
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
    });
  });

  describe('GET/ 404 error', function() {
    it('should send a 404 error and html', function(done) {
      request(app)
        .get('/api/doesntexist')
        .expect('Content-Type', /html/)
        .expect(404)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
    });
  });

  describe('GET 400 error by passing bad data', function() {
    it('should send a 400 error and html', function(done) {
      request(app)
        .get('/v1/api/term/notanumber/longest-preview-media-url')
        .expect('Content-Type', /html/)
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
    });
  });

});
