const fs = require('fs')
const path = require('path')
const readline = require('readline')

const inFile = './ADV-full-labels' // add input file here
const outFile = path.resolve(__dirname, 'ADV-full-labels.json') //add outfile here

let output = []
let team = {
  id: "",
  tag: "",
  pokes: ""
}
let idx = 0

function lineHandler(line) {
  line = line.trim()

  if (idx % 4 === 0) {
    team.id = line
  } else if (idx % 4 === 1) {
    team.pokes = line
  } else if (idx % 4 === 2){
    if (!line.split(': ')[1]) {
      console.log(team.id)
    } else {
      team.tag = line.split(': ')[1].trim()
    }
    output.push(team)
    team = {
      id: "",
      tag: "",
      pokes: ""
    }
  }

  idx += 1
}

const lineReader = readline.createInterface({
  input: fs.createReadStream(inFile)
})

lineReader.on('line', lineHandler)

lineReader.on('close', () => {
  fs.writeFileSync(outFile, JSON.stringify(output, null, 2))
})
