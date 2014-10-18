var SentenceGradeLevel = require('../app_modules/sentenceGradeLevel');
var buzzDetector = new(require('../app_modules/buzzDetector'))();

var IndexController = function () {

};

IndexController.prototype.scorePhrase = function (sentence) {
    return buzzDetector.buzzPerTotalwords(sentence);
};

IndexController.prototype.receiveSound = function (sound) {
    return JSON.stringify({"status": "ok"});
};

IndexController.prototype.sentenceGrading = function (req) {
    var fleschKincaid = new SentenceGradeLevel(req.body.sentence);
    var gradingDetails = {
        buzz: buzzDetector.buzzPerTotalwords(req.body.sentence), fleschKincaid:fleschKincaid.grade()
    };
    return gradingDetails;
};

module.exports = IndexController;
