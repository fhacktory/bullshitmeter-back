var assert = require('chai').assert;
var cleanupUtils = require('../../../utils/cleanupUtils');

describe('CleanupUtils - Remove Stop Words', function () {
    it('should not remove anything if no stop words are present', function () {
        //setup
        var cleanup = new cleanupUtils();
        var sentence = 'correct horse battery staple';
        //action
        var actual = cleanup.removeStopWords(sentence);
        //assert
        assert.equal(actual, 'correct horse battery staple');
    });

    it('should remove french stop words if they\'re present', function(){
        //setup
        var cleanup = new cleanupUtils();
        var sentence = 'le correct horse de la battery dans une staple';
        //action
        var actual = cleanup.removeStopWords(sentence);
        //assert
        assert.equal(actual, 'correct horse battery staple');
    });

//    it('should delete punctuation marks', function(){
//        //setup
//        var cleanup = new cleanupUtils();
//        var sentence = 'correct,()!horse.battery>staple#';
//        //action
//        var actual = cleanup.removeStopWords(sentence);
//        //assert
//        assert.equal(actual, 'correct horse battery staple');
//    });
});