var assert = require('chai').assert;
var SentenceGradeLevel = require('../../../app_modules/sentenceGradeLevel.js');

describe('Sentence Grade Level', function(){
    it('should give a grade to a sentence', function(){
        //setup
        var sentenceGrader = new SentenceGradeLevel('ma nouvelle phrase qui est super');
        //action
        var actual = sentenceGrader.grade();
        //assert
        assert.equal(Math.floor(actual*1000)/1000, 5.246);
    });

});

