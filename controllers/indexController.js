var buzzwords = require('buzzwords');
var _ = require('lodash');
var SentenceGradeLevel = require('../app_modules/sentenceGradeLevel');
var BuzzDetector = require('../app_modules/buzzDetector');

var IndexController = function () {
    var detector = new BuzzDetector();

};

IndexController.prototype.scorePhrase = function (sentence) {
    var buzzDetector = new BuzzDetector();
    return buzzDetector.amIBuzzing(sentence);
};

IndexController.prototype.sentenceGrading = function(){
  var sentenceGradeLevel = new SentenceGradeLevel();

};

module.exports = IndexController;
