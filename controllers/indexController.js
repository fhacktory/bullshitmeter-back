var buzzwords = require('buzzwords');
var _ = require('lodash');
var IndexController = function () {
};

IndexController.prototype.scorePhrase = function (phrase) {
    var endScore = 0;
    //diacritics / punctuation removal before ?
    var words = phrase.split(' ');
    _.forEach(words, function(word){

    });
};

module.exports = IndexController;
