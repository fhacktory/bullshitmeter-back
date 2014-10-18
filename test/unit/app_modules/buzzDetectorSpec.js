var assert = require('chai').assert;
var BuzzDetector = require('../../../app_modules/buzzDetector.js');

describe('AmIBuzzing', function () {
    it('should return 0 if no buzzwords are detected', function () {
        //setup
        var buzzWord = new BuzzDetector();
        //action
        var actual = buzzWord.amIBuzzing('some random sentence with unicorns in it');
        //assert
        assert.equal(actual, 0);
    });

    it('should return 3 if 3 buzzwords are found', function(){
        //setup
        var buzzWord = new BuzzDetector();
        //action
        var actual = buzzWord.amIBuzzing('some random sentence with unicorns that grow under headlights and paradigm');
        //assert
        assert.equal(actual, 3);
    });

    it('should detect custom words added by the app', function(){
        //setup
        var buzzWord = new BuzzDetector();
        //action
        var actual = buzzWord.amIBuzzing('some random sentence with synergie and agile');
        //assert
        assert.equal(actual, 2);
    });
});