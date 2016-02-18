var services = require('../services');
var errors = require('../common/errors');

function V1Handler() {}

V1Handler.prototype.longestPreviewMediaUrl = function longestPreviewMediaUrl(req, res) {
  var tid = req.params.tid;
  // Doing a quick validation here
  // but should be more robust
  if (isNaN(Number(tid))) {
    return res
      .status(400)
      .set('Content-Type', 'text/html')
      .send(errors.errorHtmlResponse(400));
  }
  
  return getVocabulary(tid)
    .then(getVideos)
    .then(getMedia)
    .then(handleResponse.bind(this, res))
    .catch(handleError.bind(this, res));
};

function getVocabulary(tid) {
  var endpoint = 'vocabulary/1/' + tid;
  return services.gaia.get(endpoint)
    .then(function(response) {
      return response 
        .terms
        .shift()
        .tid;
    });
}

function getVideos(tid) {
  var endpoint = 'videos/term/' + tid;
  return services.gaia.get(endpoint)
     .then(function(response) {
       return response.titles
         .map(function(title) {
           return { 
             previewDuration: title.preview &&
               Number(title.preview.duration),
             previewNid: title.preview && 
              title.preview.nid,
             titleNid: title.nid 
           }; 
         })
         .sort(function(a, b) {
           return b.previewDuration - a.previewDuration;
         })
         .shift();
     });
}

function getMedia(title) {
  var endpoint = 'media/' + title.previewNid;
  return services.gaia.get(endpoint)
    .then(function(response) {
      return Object
        .assign(
          title, 
          { bcHLS: response.mediaUrls.bcHLS }
        );
    });
}

function handleResponse(res, val) {
  return res
    .status(200)
    .json(val);
}

function handleError(res, err) {
  console.error('Server Error: ', err.message, err.stack);
  return res
    .status(500)
    .set('Content-Type', 'text/html')
    .send(errors.errorHtmlResponse(500));
}

module.exports = V1Handler;
