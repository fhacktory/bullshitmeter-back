var SentenceGradeLevel = require('../app_modules/sentenceGradeLevel');
var buzzDetector = new(require('../app_modules/buzzDetector'))();

var IndexController = function () {};

IndexController.prototype.receiveSound = function (fields, files) {
    var sound = files['soundFile'];

	//console.log('sound='+sound)
	fs.writeFile("/tmp/voice.m4a", sound, {encoding : "binary"}, function(err) {
		if(err) {
			console.log(err);
		}
	});
    return JSON.stringify({"status": "ok"});
};

IndexController.prototype.sentenceGrading = function (req) {
    var fleschKincaid = new SentenceGradeLevel(req.body.sentence);

    var buzz = buzzDetector.buzzPerTotalwords(req.body.sentence);
    var fkGrade = fleschKincaid.grade()
    var gradingDetails = {
        buzzwords:buzz.suspects,
        ratio:buzz.ratio,
        grade:Math.min(buzz.ratio*fkGrade, 20),
        'flesch-kincaid':fkGrade,
        recognized_text:req.body.sentence
    };
    return gradingDetails;
};

module.exports = IndexController;
