var fs = require('fs');
var url = require('url');

var name = process.argv[3];
var format = process.argv[4];
var outfile = fs.createWriteStream(`output/${name}-${format}`); //check
var parseReplay = require("./parseReplay.js").parseReplay;
var http = require('http');

function writeResult(battleTitle, urlString) {
  var replay = url.parse(urlString);

  var options = {
    host: replay.host,
    path: replay.path
  };

  callback = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      outfile.write(battleTitle + parseReplay(str, name) + "\n");
    });
  }

  http.request(options, callback).end();
}

var replayList = JSON.parse(process.argv[2]);
// outfile.write(process.argv[2]);

replayList.forEach(function(str) {
  if (str.length > 0) {
    var sections = str.split(": ");
    var battleName = sections[0];

    var playerNames = battleName.split(" vs. ");

    let battleTitle;
    if (playerNames[0].toUpperCase() === name.toUpperCase()) {
      battleTitle = battleName;
    } else {
      battleTitle = playerNames.reverse().join(" vs. ");
    }

    var urlName = sections[1].trim();
    writeResult(battleTitle + ": " + urlName + " - ", urlName);
  }
});
