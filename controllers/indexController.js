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
    var actualText = JSON.parse(req.body.sentence).text;
    var fleschKincaid = new SentenceGradeLevel(actualText);

    var buzz = buzzDetector.buzzPerTotalwords(actualText);
    var fkGrade = fleschKincaid.grade()
    var gradingDetails = {
        buzzwords:buzz.suspects,
        ratio:buzz.ratio,
        grade:Math.min(fkGrade/2 + buzz.ratio*fkGrade, 20),
        'flesch-kincaid':fkGrade,
        recognized_text:actualText
    };

    console.log("gradingDetails = "+gradingDetails.ratio);
    console.log("gradingDetails = "+gradingDetails.grade);
    console.log("gradingDetails = "+gradingDetails['flesch-kincaid']);
    console.log("gradingDetails = "+gradingDetails.recognized_text);


    return gradingDetails;
};

module.exports = IndexController;
