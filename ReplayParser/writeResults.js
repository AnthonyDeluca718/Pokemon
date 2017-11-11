var fs = require('fs');
var url = require('url');
var parseReplay = require("./parseReplay.js")
var http = require('http');

function writeResult(urlString, outfile) {
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
      outfile.write(urlString + " - " + parseReplay(str) + "\n");
    });
  }

  http.request(options, callback).end();
}

module.exports = function(replayList, outfileName) {
    var outfile = fs.createWriteStream(outfileName)

    replayList.forEach(function(str) {
      if (str.length > 0) {
        writeResult(str, outfile)
      }
    });
}
