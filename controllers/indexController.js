var SentenceGradeLevel = require('../app_modules/sentenceGradeLevel');
var BuzzDetector = require('../app_modules/buzzDetector');

var IndexController = function () {

};

IndexController.prototype.scorePhrase = function (sentence) {
    var buzzDetector = new BuzzDetector();
    return buzzDetector.amIBuzzing(sentence);
};

IndexController.prototype.sentenceGrading = function(){
  var sentenceGradeLevel = new SentenceGradeLevel();

};

module.exports = IndexController;
