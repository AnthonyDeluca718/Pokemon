var arrStr = process.argv[2];
var format = "[" + process.argv[3] + "]";

var fs = require('fs');
var outfile = fs.createWriteStream("outfile");

var arr = JSON.parse(arrStr);
var output = [];

for (var i=0; i<arr.length; i++) {
  var tier = arr[i][0].split(" ")[0];
  var title = arr[i][0].split(" ").splice(1).join(" ");
  var url = arr[i][1];

  if (tier == format) {
    output.push(`${title}: ${url}`);
  }
}
console.log(JSON.stringify(output));
// // //
