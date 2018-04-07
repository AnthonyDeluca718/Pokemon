const fs = require('fs')
const path = require('path')
const records = require('./TempData/ADV-SPL9.json')
const outfile = path.resolve(__dirname, 'TempData', 'ADV-SPL9-teams')

let teams = []
records.forEach(match => {
  const id = match.id
  const pokes1 = match.p1.pokes.map(poke => poke.name).join(' ')
  const pokes2 = match.p2.pokes.map(poke => poke.name).join(' ')
  teams.push({
    id: id + "-p1",
    pokes: pokes1
  })
  teams.push({
    id: id + "-p2",
    pokes: pokes2
  })
})

const sorted = teams.sort((a, b) => {
  if (a.pokes < b.pokes) {
    return -1
  } else if (a.pokes > b.pokes) {
    return 1
  } else {
    return 0
  }
})

const format = ({id, pokes}) => {

  return id + "\n" + pokes + "\n" + "Main: " + "\n\n"
}

fs.writeFileSync(outfile, sorted.map(data => format(data)).join(''))
