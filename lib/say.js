var spawn = require('child_process').spawn
  , child;

var say = exports;

if (process.platform == 'darwin') {
  say.speaker = 'say';
}
else if (process.platform == 'linux') {
  console.log("This is linux platform.");
}

var soundDirectory = process.env.SOUND_DIRECTORY || './ds/';

// say stuff, speak
exports.speak = function(voice, text, filename, callback){
  var commands,
      pipedData;
  if(arguments.length < 2){
    console.log('invalid amount of arguments sent to speak()');
    return;
  }

  filename = soundDirectory + filename;
  console.log(filename)

  if (process.platform == 'darwin') {
    commands = [ '-v', voice, text, '-o', filename];
  }
  else if (process.platform == 'linux') {
    console.log("This is linux platform.");
  }

  var childD = spawn(say.speaker, commands);

  childD.stdin.setEncoding('ascii');
  childD.stderr.setEncoding('ascii');

  if (process.platform == 'linux') {
    childD.stdin.end(pipedData);
  }

  childD.stderr.on('data', function(data){ console.log(data); });
  childD.stdout.on('data', function(data){ console.log(data); });

  childD.addListener('exit', function (code, signal) {
    if(code == null || signal != null) {
      console.log('couldnt talk, had an error ' + '[code: '+ code + '] ' + '[signal: ' + signal + ']');
    }

    // we could do better than a try / catch here
    try{
      callback();
    }
    catch(err){
    }
  });
}