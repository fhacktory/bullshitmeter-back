var BuzzDetector = function () {
};
var _ = require('lodash');
var buzzword = require('buzzword');

BuzzDetector.prototype.amIBuzzing = function (sentence) {
    //diacritics / punctuation removal before ?
    var words = sentence.split(' ');
    var buzzWords = _.filter(words, function (word) {
        return(buzzword.is(word));
    });
    return buzzWords.length;
};

module.exports = BuzzDetector;