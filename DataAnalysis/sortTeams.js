const fs = require('fs')
const path = require('path')
const readline = require('readline')

const inFile = './TempData/ADV-SPL9-teams' // add input file here
// const outFile = path.resolve(__dirname, 'Sorted-SPL9') //add outfile here

let output = []
let team

let idx = 0
function lineHandler(line) {
  line = line.trim()
  console.log(idx)

  if (line === '') {

  } else if (idx === 0) {

  } else if (idx === 1) {

  } else if (idx === 2){

  }

  idx += 1
}

const lineReader = readline.createInterface({
  input: fs.createReadStream(inFile)
})

lineReader.on('line', lineHandler)

lineReader.on('close', () => {
  console.log('close')
})
