const axios = require('axios')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const parseReplay = require('./ReplayParser/parseReplay')

const inFile = './ADV-Analysis/spl7' // add input file here
const startingIdx = 0 // initial index
const outFile = path.resolve(__dirname, 'spl7-data.json') //add outfile here

let data = []
let output = []
let context = []
let idx = startingIdx

function lineHandler(line) {
  line = line.trim()

  if (line == '') {
    // skip
  } else if (line.slice(0, 3) == '===') {
    context = line.split(' ').slice(1)
  } else {
    data.push({
      id: idx,
      url: line,
      context: context
    })
    idx += 1
  }
}

const lineReader = readline.createInterface({
  input: fs.createReadStream(inFile)
})

lineReader.on('line', lineHandler)

lineReader.on('close', () => {
  axios.all(data.map(ob => {
    return axios.get(ob.url).then(res => {
      info = parseReplay(res.data)
      info.id = ob.id
      info.context = ob.context
      output.push(info)
    })
  }))
  .then(() => fs.writeFileSync(outFile, JSON.stringify(output, null, 2)))
})
