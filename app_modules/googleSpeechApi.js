var https = require('https');
var fs = require('fs');
var exec = require('child_process').exec;

var GoogleSpeechApi = function(){
};

GoogleSpeechApi.prototype.readSound = function(soundPath, callback){
  //convert m4a into wav
	exec("ffmpeg -y -i "+ soundPath +" -ar 16000 -acodec pcm_s16le -ac 1 tmp/file.wav", function (error, stdout, stderr) {
    if(stderr) {
      console.log(stderr);
    }
    if(error) { 
      console.log(error);
    }

    exec("curl -X POST --data-binary @'tmp/file.wav' --header 'Content-Type: audio/l16; rate=16000;' 'https://www.google.com/speech-api/v2/recognize?output=json&lang=fr-fr&key=AIzaSyCRup2tofrIDwGQNTM2JD_HXsg0tv-DzzQ'", function (error, stdout, stderr) {
      //var stdout = "<!DOCTYPE html> <html lang=en> <meta charset=utf-8> <meta name=viewport content=\"initial-scale=1, minimum-scale=1, width=device-width\">  <title>Error 403 (Forbidden)!!1</title>   <style>     *{margin:0;padding:0}html,code{font:15px/22px arial,sans-serif}html{background:#fff;color:#222;padding:15px}body{margin:7% auto 0;max-width:390px;min-height:180px;padding:30px 0 15px}* > body{background:url(//www.google.com/images/errors/robot.png) 100% 5px no-repeat;padding-right:205px}p{margin:11px 0 22px;overflow:hidden}ins{color:#777;text-decoration:none}a img{border:0}@media screen and (max-width:772px){body{background:none;margin-top:0;max-width:none;padding-right:0}}#logo{background:url(//www.google.com/images/errors/logo_sm_2.png) no-repeat}@media only screen and (min-resolution:192dpi){#logo{background:url(//www.google.com/images/errors/logo_sm_2_hr.png) no-repeat 0% 0%/100% 100%;-moz-border-image:url(//www.google.com/images/errors/logo_sm_2_hr.png) 0}}@media only screen and (-webkit-min-device-pixel-ratio:2){#logo{background:url(//www.google.com/images/errors/logo_sm_2_hr.png) no-repeat;-webkit-background-size:100% 100%}}#logo{display:inline-block;height:55px;width:150px}   </style> <a href=//www.google.com/><span id=logo aria-label=Google></span></a>   <p><b>403.</b> <ins>That’s an error.</ins>   <p>Your client does not have permission to get URL <code>/speech-api/v2/recognize?output=json&amp;lang=fr-fr&amp;key=AIzaSyC4svxzeFM508o0lE76fB8k9e_GkM05gZI</code> from this server. Invalid key. <ins>That’s all we know.</ins>"      
      var isError = stdout.indexOf("<title>Error 403 (Forbidden)") > -1;
      console.log("Called Google API with stdout ="+stdout);
      console.log("is error ="+isError);

      callback(stderr, stdout);
    });
  });
};

module.exports = GoogleSpeechApi;