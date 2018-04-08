const fs = require('fs')
const path = require('path')
const readline = require('readline')

const inFile = './TempData/ADV-SPL9-teams' // add input file here
const outfile = path.resolve(__dirname, 'Sorted-SPL9')
const jsonFile = path.resolve(__dirname, 'Sorted.json')

let output = []
let team
let label

let idx = 1
function lineHandler(line) {
  line = line.trim()

  if (idx % 4 === 2) {
    team = line
  } else if (idx % 4 === 3) {
    label = line
  } else if (idx % 4 === 0){
    output.push({
      team,
      label
    })
  }

  idx += 1
}

const lineReader = readline.createInterface({
  input: fs.createReadStream(inFile)
})

lineReader.on('line', lineHandler)

const format = ({team, label}) => {
  return team + "\n" + label + "\n\n"
}

lineReader.on('close', () => {
  let sorted = output.sort((a, b) => {
    if (a.team < b.team) {
      return -1
    } else if (a.team > b.team) {
      return 1
    } else {
      return 0
    }
  })

  fs.writeFileSync(outfile, sorted.map(data => format(data)).join(''))
  fs.writeFileSync(jsonFile, JSON.stringify(sorted, null, 2))
})
