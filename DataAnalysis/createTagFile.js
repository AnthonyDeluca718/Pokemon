const fs = require('fs')
const path = require('path')
const records = require('./TempData/ADV-SPL9.json')
const outfile = path.resolve(__dirname, 'TempData', 'ADV-SPL9-teams')
const sortedTeams = require('./Sorted.json')

let teams = []
records.forEach((match, idx) => {
  const id = match.id
  const pokes1 = match.p1.pokes.map(poke => poke.name).join(' ')
  const pokes2 = match.p2.pokes.map(poke => poke.name).join(' ')
  teams.push({
    id: id + "-p1",
    pokes: pokes1,
    label: sortedTeams[idx].label
  })
  teams.push({
    id: id + "-p2",
    pokes: pokes2,
    label: sortedTeams[idx].label
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



const format = ({id, pokes, label}) => {

  return id + "\n" + pokes + "\n" + `Main: ${label}` + "\n\n"
}

fs.writeFileSync(outfile, sorted.map(data => format(data)).join(''))
