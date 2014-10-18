var additionalWords = require('../config/data/moreBuzz.json');
var _ = require('lodash');
var buzzword = require('buzzwords');
var cleanupUtils = new (require('../utils/cleanupUtils.js'))();

var BuzzDetector = function () {
    _.forEach(additionalWords, function(additionalWord){
        buzzword.add(additionalWord);
    });
};

BuzzDetector.prototype.amIBuzzing = function (sentence) {
    //diacritics / punctuation removal before ?
    var cleanedWords = cleanupUtils.removeStopWords(sentence);
    var words = cleanedWords.split(' ');
    var buzzWords = _.filter(words, function (word) {
        return(buzzword.is(word));
    });
    return buzzWords;
};

BuzzDetector.prototype.buzzPerTotalwords = function(sentence){
    var cleanedWords = cleanupUtils.removeStopWords(sentence);
    var totalBuzz = this.amIBuzzing(sentence);
    var computedRatio = (totalBuzz.length / cleanedWords.split(' ').length);
    var result = {ratio:computedRatio, suspects:totalBuzz};
    return result;
};

module.exports = BuzzDetector;