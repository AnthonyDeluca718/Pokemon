const fs = require('fs')
const parseReplay = require('../parseReplay')
const path = require('path')

console.log(path.resolve(__dirname, 'test.html'))

fs.readFile(path.resolve(__dirname, 'test.html'), 'utf-8', function(err, data) {
  console.log(JSON.stringify(parseReplay(data), null, 2))
})
