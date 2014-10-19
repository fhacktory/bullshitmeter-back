var express = require('express');
var passport = require('passport');
var router = express.Router();

var indexController = new (require('../controllers/indexController.js'))();

var session = require('express-session');
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development'
}

var config = require('../config/all.js');


var app = express();

app.use(session({ secret: 'Some Secret !!!', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

router.get('/', function (req, res, next) {
    res.render('scoreMeForm', {title: config.APP_TITLE});
});

router.get('/score-me', function (req, res, next) {
    res.json({score: indexController.receiveSound(req.body.sound)});
});
var formidable = require('formidable');
router.post('/sound', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //FIXME: on répond avant la fin des callback. Tester de faire un res.write puis res.end dans les callback ?
        indexController.receiveSound(fields, files, function (result) {
            res.json(result);
        });
    });
});

router.post('/score-me', function (req, res, next) {
    var gradeData = indexController.sentenceGrading(req);
    if (req.body.client == 'web') {
        res.render('results', {title: config.APP_TITLE, data: gradeData})
    } else {
        res.json(gradeData);
    }
});

module.exports = router;
