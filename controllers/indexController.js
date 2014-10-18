var SentenceGradeLevel = require('../app_modules/sentenceGradeLevel');
var buzzDetector = new(require('../app_modules/buzzDetector'))();
var speechApi = new(require('../app_modules/googleSpeechApi'))();
var fs = require('fs');

var IndexController = function () {
};

IndexController.prototype.scorePhrase = function (sentence) {
    return buzzDetector.buzzPerTotalwords(sentence);
};


IndexController.prototype.receiveSound = function (sound, files) {
  var soundPath = files['myUpload']['path'];
  speechApi.readSound(soundPath, function(err, recognizedText) {
    if(err) {
      console.log(err);
    }

    return JSON.stringify({"text": recognizedText});
  });
};

IndexController.prototype.sentenceGrading = function (req) {
    var fleschKincaid = new SentenceGradeLevel(req.body.sentence);
    var gradingDetails = {
        buzz: buzzDetector.buzzPerTotalwords(req.body.sentence), fleschKincaid:fleschKincaid.grade()
    };
    return gradingDetails;
};

module.exports = IndexController;
