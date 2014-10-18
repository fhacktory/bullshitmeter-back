var buzzwords = require('buzzwords');
var _ = require('lodash');
var SentenceGradeLevel = require('../app_modules/sentenceGradeLevel');

var IndexController = function () {
};

IndexController.prototype.scorePhrase = function (phrase) {
    var endScore = 0;
    //diacritics / punctuation removal before ?
    var words = phrase.split(' ');
    _.forEach(words, function(word){
//        buzzword.is(word) ? endScore+=wordFoundScore;
    });
};

IndexController.prototype.sentenceGrading = function(){
  var sentenceGradeLevel = new SentenceGradeLevel();

};

module.exports = IndexController;
