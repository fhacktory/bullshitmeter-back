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

router.get('/', function(req, res, next){
    res.render('scoreMeForm', {title:config.APP_TITLE});
});

router.get('/score-me', function(req, res, next){
    res.json({score:indexController.scorePhrase(req.body.phrase)});
});

module.exports = router;
