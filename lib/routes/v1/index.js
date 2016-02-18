var express = require('express');
var router = express.Router();

var handlers = require('../../handlers');

router.get('/api/term/:tid/longest-preview-media-url', 
  handlers.v1.longestPreviewMediaUrl);

module.exports = router;
