var SentenceGradeLevel = require('./app_modules/sentenceGradeLevel.js');

var args = process.argv.slice(2);
var sentence = args.join(' ')

var sentenceGradeLevel = new SentenceGradeLevel(sentence);
console.log('Sentence grade : ' + sentenceGradeLevel.grade());

