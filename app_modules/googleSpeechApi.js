var https = require('https');
var fs = require('fs');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var spawn = require('child_process').spawn;

var GoogleSpeechApi = function () {
};

GoogleSpeechApi.prototype.parseGoogleResponse = function (response) {
    //response = '{"result":[]}\r\n{"result":[{"alternative":[{"transcript":"ok on enregistre un texte en moins de 30 secondes pour faire un test épisode devrait suffir"},{"transcript":"ok on enregistre un texte en moins de 30 secondes pour faire un test de épisode devrait suffir"},{"transcript":"ok on enregistre un texte en moins de 30 secondes pour faire un test épisode devrait suffire"},{"transcript":"ok on enregistre un texte en moins de 30 secondes pour faire un test 2 épisode devrait suffir"},{"transcript":"ok on enregistre un text en moins de 30 secondes pour faire un test épisode devrait suffir"}],"final":true}],"result_index":0}'
    console.log("Google API response="+response);

    var results = response.split("\r\n");

    console.log(results);
    console.log("res1 = "+results[0]);
    console.log("res2 = "+results[1]);

    var result = JSON.parse(results[1]).result[0].alternative[0].transcript;
    console.log("RESULT > " + result);  
    
    return result;
};

GoogleSpeechApi.prototype.requestGoogle = function (callback) {
    var self = this;
    exec("curl -X POST --data-binary @'tmp/file.wav' --header 'Content-Type: audio/l16; rate=16000;' 'https://www.google.com/speech-api/v2/recognize?output=json&lang=fr-fr&key=AIzaSyBkTZNKMMxK8BIOsHJlA4vB2qmafSe30uY'", function (error, stdout, stderr) {
//        execFile('/usr/bin/curl', ['-X', 'POST', '--data-binary', "@'tmp/file.wav'", '--header', "'Content-Type: audio/l16; rate=16000;'", "'https://www.google.com/speech-api/v2/recognize?output=json&lang=fr-fr&key=AIzaSyCRup2tofrIDwGQNTM2JD_HXsg0tv-DzzQ'"], {}, function(error, stdout, stderr){
        //var stdout = "<!DOCTYPE html> <html lang=en> <meta charset=utf-8> <meta name=viewport content=\"initial-scale=1, minimum-scale=1, width=device-width\">  <title>Error 403 (Forbidden)!!1</title>   <style>     *{margin:0;padding:0}html,code{font:15px/22px arial,sans-serif}html{background:#fff;color:#222;padding:15px}body{margin:7% auto 0;max-width:390px;min-height:180px;padding:30px 0 15px}* > body{background:url(//www.google.com/images/errors/robot.png) 100% 5px no-repeat;padding-right:205px}p{margin:11px 0 22px;overflow:hidden}ins{color:#777;text-decoration:none}a img{border:0}@media screen and (max-width:772px){body{background:none;margin-top:0;max-width:none;padding-right:0}}#logo{background:url(//www.google.com/images/errors/logo_sm_2.png) no-repeat}@media only screen and (min-resolution:192dpi){#logo{background:url(//www.google.com/images/errors/logo_sm_2_hr.png) no-repeat 0% 0%/100% 100%;-moz-border-image:url(//www.google.com/images/errors/logo_sm_2_hr.png) 0}}@media only screen and (-webkit-min-device-pixel-ratio:2){#logo{background:url(//www.google.com/images/errors/logo_sm_2_hr.png) no-repeat;-webkit-background-size:100% 100%}}#logo{display:inline-block;height:55px;width:150px}   </style> <a href=//www.google.com/><span id=logo aria-label=Google></span></a>   <p><b>403.</b> <ins>That’s an error.</ins>   <p>Your client does not have permission to get URL <code>/speech-api/v2/recognize?output=json&amp;lang=fr-fr&amp;key=AIzaSyC4svxzeFM508o0lE76fB8k9e_GkM05gZI</code> from this server. Invalid key. <ins>That’s all we know.</ins>"
        var isError = stdout.indexOf("<title>Error 403 (Forbidden)") > -1;
        var isEmpty = (stdout.length < 30);
        console.log("Called Google API with stdout =" + stdout);
        console.log("is error =" + isError);
        console.log("is empty =" + isEmpty + "length is :"+stdout.length);
        if (isError) {
          console.log("403 ... retrying ...")
          self.requestGoogle(callback);
        } 
        else if(isEmpty) {
          console.log("Got empty response ... retrying ...")
          self.requestGoogle(callback);
        }
        else {
          var parsedText = self.parseGoogleResponse(stdout);
          console.log("Parsed response from google = "+parsedText);
          callback(stderr, parsedText);
        }
    });
};

GoogleSpeechApi.prototype.readSound = function (soundPath, callback) {
    var self = this;
    var filePath = "tmp/file.wav"; 
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    //convert m4a into wav
    exec("ffmpeg -y -i " + soundPath + " -ar 16000 -acodec pcm_s16le -ac 1 tmp/file.wav", function (error, stdout, stderr) {
        //execFile('ffmpeg', ['-y', '-i', soundPath, '-ar', '16000', '-acodec', 'pcm_s16le', '-ac', 1, 'tmp/file.wav'], {}, function (error, stdout, stderr) {
        if (stderr) {
            console.log(stderr);
        }
        if (error) {
            console.log(error);
        }
        self.requestGoogle(function (err, data) {
            callback(err, data);
        });
    });

//    var ffmpeg = spawn('ffmpeg', ['-y', '-i', soundPath, '-ar', '16000', '-acodec', 'pcm_s16le', '-ac', '1', 'tmp/file.wav']);

//    ffmpeg.on('data', function(data){
//       console.log('ffmpeg data >>'+d ata);
//    });
//    ffmpeg.on('close', function(code){
//        console.log('ffmpeg returned w/ code '+code);
//        var curl = spawn('curl', ['-X', 'POST', '--data-binary', "@'./tmp/file.wav'", '--header', "'Content-Type: audio/l16; rate=16000;'", "'https://www.google.com/speech-api/v2/recognize?output=json&lang=fr-fr&key=AIzaSyCRup2tofrIDwGQNTM2JD_HXsg0tv-DzzQ'"]);
//
//        curl.stdout.on('data', function(data){
//            console.log('OUT>>> '+data);
//        });
//        curl.stderr.on('data', function(data){
//            console.log('ERR>>> '+data);
//        });
//        curl.on('close', function(code){
//           console.log('curl returned w/ code '+code);
//
//        });
//    });


};

module.exports = GoogleSpeechApi;