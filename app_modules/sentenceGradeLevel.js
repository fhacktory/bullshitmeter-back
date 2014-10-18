var fleschKincaid = require('flesch-kincaid');
var syllable = require('syllable');
var cleanupUtils = new (require('../utils/cleanupUtils'))();

var SentenceGradeLevel = function(sentence){this.sentence = cleanupUtils.removeStopWords(sentence)};

SentenceGradeLevel.prototype.grade = function(){
    var syllable_count=0;
    this.sentence.split(" ").forEach(function(entry) {syllable_count+=syllable(entry)})
    var word_count = this.sentence.split(" ").length

    return fleschKincaid({
	    'sentence' : 1,
	    'word' : word_count,
	    'syllable' : syllable_count
	});
};



module.exports = SentenceGradeLevel;