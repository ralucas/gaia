var express = require('express');
var router = express.Router();

var handleLongestPreviewMediaUrl = require('../handlers/v1');

router.get('/api/term/:tid/longest-preview-media-url', 
  handleLongestPreviewMediaUrl);

module.exports = router;
