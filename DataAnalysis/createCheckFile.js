const fs = require('fs')
const path = require('path')
const records = require('./TempData/adv-full-data.json')
const existingTags = require('./TempData/adv-full-tags.json')
const outfile = path.resolve(__dirname, 'TempData', 'ADV-full-labels')

let teams = []
records.forEach((match, idx) => {
  const id = match.id
  const pokes1 = match.p1.pokes.map(poke => poke.name).join(' ')
  const pokes2 = match.p2.pokes.map(poke => poke.name).join(' ')

  let found1, found2
  if (existingTags) {
    found1 = existingTags.find(pair => pair.team === pokes1)
    found2 = existingTags.find(pair => pair.team === pokes2)
  }
  const label1 = found1 ? found1.label : 'Main: '
  const label2 = found2 ? found2.label : 'Main: '

  teams.push({
    id: id + "-p1",
    pokes: pokes1,
    label: label1
  })
  teams.push({
    id: id + "-p2",
    pokes: pokes2,
    label: label2
  })
})

const format = ({id, pokes, label}) => {

  return id + "\n" + pokes + "\n" + label + "\n\n"
}

fs.writeFileSync(outfile, sorted.map(data => format(data)).join(''))
