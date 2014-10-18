var _ = require('lodash');
var stopwords = require('../config/data/stopWords-FR.json');
var CleanupUtils = function () {
};

CleanupUtils.prototype.removeStopWords = function (sentence) {
    //var sentence = sentence.replace(/(\p{P})+/g, '');
    var splittedSentence = sentence.split(' ');
    var result =
        _.filter(splittedSentence, function (word) {
            var endResult = true;
            _.forEach(stopwords, function (stopWord) {
                if (stopWord == word) {
                    endResult = false;
                }
            });
            return endResult;
        });
    return result.join(' ');
};

module.exports = CleanupUtils;