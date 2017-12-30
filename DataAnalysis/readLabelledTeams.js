const fs = require('fs')
const path = require('path')
const readline = require('readline')

const inFile = './spl7-teams' // add input file here
const outFile = path.resolve(__dirname, 'spl7-team-tags.json') //add outfile here

let output = []
let team = {
  id: "",
  tag: ""
}
let idx = 0

function lineHandler(line) {
  line = line.trim()

  if (line === '') {
    //next
  } else if (idx === 0) {
    team.id = line
    idx += 1
  } else if (idx === 1) {
    idx += 1
  } else if (idx === 2){
    team.tag = line.split(': ')[1].trim()
    output.push(team)
    team = {
      id: "",
      tag: ""
    }
    idx = 0
  }
}

const lineReader = readline.createInterface({
  input: fs.createReadStream(inFile)
})

lineReader.on('line', lineHandler)

lineReader.on('close', () => {
  fs.writeFileSync(outFile, JSON.stringify(output, null, 2))
})
