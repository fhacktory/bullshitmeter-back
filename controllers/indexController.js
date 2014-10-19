var SentenceGradeLevel = require('../app_modules/sentenceGradeLevel');
var buzzDetector = new(require('../app_modules/buzzDetector'))();
var speechApi = new(require('../app_modules/googleSpeechApi'))();
var fs = require('fs');

var IndexController = function () {
};

IndexController.prototype.scorePhrase = function (sentence) {
    return buzzDetector.buzzPerTotalwords(sentence);
};


IndexController.prototype.receiveSound = function (sound, files, callback) {
  var soundPath = files['myUpload']['path'];
  var result = speechApi.readSound(soundPath, function(err, recognizedText) {
    callback(err, JSON.stringify({"text": recognizedText}));
  });
};

IndexController.prototype.sentenceGrading = function (req) {
    var fleschKincaid = new SentenceGradeLevel(req.body.sentence);

    var buzz = buzzDetector.buzzPerTotalwords(req.body.sentence);
    var fkGrade = fleschKincaid.grade()
    var gradingDetails = {
        buzzwords:buzz.suspects,
        ratio:buzz.ratio,
        grade:Math.min(fkGrade/2 + buzz.ratio*fkGrade, 20),
        'flesch-kincaid':fkGrade,
        recognized_text:req.body.sentence
    };

    console.log("gradingDetails = "+gradingDetails);

    return gradingDetails;
};

module.exports = IndexController;
