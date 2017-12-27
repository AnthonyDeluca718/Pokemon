const axios = require('axios')
const fs = require('fs')
const readline = require('readline')

const inFile = './test' // add input file here

const lineReader = readline.createInterface({
  input: fs.createReadStream(inFile)
});

lineReader.on('line', function (line) {
  console.log('Line from file:', line);
});
