var SentenceGradeLevel = function(){};

SentenceGradeLevel.prototype._mySentence = '';

SentenceGradeLevel.prototype.gradeSentence = function(sentence){
    this._mySentence = sentence;
};





module.exports = SentenceGradeLevel;