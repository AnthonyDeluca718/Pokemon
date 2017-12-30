const axios = require('axios')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const parseReplay = require('./ReplayParser/parseReplay')

const inFile = './ADV-Analysis/Callous-Invite' // add input file here
const startingIdx = 50 // initial index
const outFile = path.resolve(__dirname, 'callous-invite.json') //add outfile here

let data = []
let output = []
let context = []
let idx = startingIdx

function lineHandler(line) {
  line = line.trim()

  if (line == '') {
    // skip
  } else if (line.slice(0, 3) == '===') {
    // context = line.split(' ').slice(1)
    context = [line.slice(4, 6), 'Callous-Invite']
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
      info.url = ob.url
      output.push(info)
    })
  }))
  .then(() => fs.writeFileSync(outFile, JSON.stringify(output, null, 2)))
  .catch(err => console.log(err))
})
