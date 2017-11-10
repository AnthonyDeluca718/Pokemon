var fs = require('fs');
var outfile = fs.createWriteStream("outfile");
var input = process.argv[2];

outfile.write(input);
