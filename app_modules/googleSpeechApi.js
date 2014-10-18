var https = require('https');
var fs = require('fs');

var GoogleSpeechApi = function(){
};
var exec = require('child_process').exec;

GoogleSpeechApi.prototype.readSound = function(soundPath, callback){
  //convert m4a into wav
	exec("ffmpeg -y -i "+ soundPath +" -ar 16000 -acodec pcm_s16le -ac 1 tmp/file.wav", function (error, stdout, stderr) {
    if(stderr) {
      console.log(stderr);
    }
    if(error) {
      console.log(error);
    }

    var post_options = {
      host: 'www.google.com',
      path: '/speech-api/v2/recognize?output=json&lang=fr-fr&key=AIzaSyCRup2tofrIDwGQNTM2JD_HXsg0tv-DzzQ',
      method: 'POST',
      headers: {
        'Content-Type': 'audio/l16; rate=16000;'
      }
    };

    var post_req = https.request(post_options, function(res) {
      console.log("statusCode: ", res.statusCode);
      console.log("headers: ", res.headers);
        callback(res.body);
    });


    // exec("curl -X POST --data-binary @'tmp/file.wav' --header 'Content-Type: audio/l16; rate=16000;' 'https://www.google.com/speech-api/v2/recognize?output=json&lang=fr-fr&key=AIzaSyCRup2tofrIDwGQNTM2JD_HXsg0tv-DzzQ'", function (error, stdout, stderr) {
    //   console.log("Called Google API");
    //   if(stdout) {
    //     console.log(stdout);
    //   }
    //   if(stderr) {
    //     console.log(stderr);
    //   }
    //   if(error) {
    //     console.log(error);
    //   }
    //   callback(stderr, stdout);
    // });
  });
};

module.exports = GoogleSpeechApi;