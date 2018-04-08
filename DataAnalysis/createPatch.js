const fs = require('fs')
const path = require('path')
const records = require('./TempData/adv-full-data.json')
const outfile = path.resolve(__dirname, 'TempData', 'ADV-patch-teams')

let teams = []
const ids = [
  1200,
  2200,
  1201,
  2201,
  1202,
  2202,
  1203,
  2203,
  1204,
  2204,
  1205,
  2205
]

records.forEach((match, idx) => {
  const id = match.id
  if (ids.find(id => id === match.id) ) {
    const pokes1 = match.p1.pokes.map(poke => poke.name).join(' ')
    const pokes2 = match.p2.pokes.map(poke => poke.name).join(' ')

    let found1, found2
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
  }
})

// const sorted = teams.sort((a, b) => {
//   if (a.pokes < b.pokes) {
//     return -1
//   } else if (a.pokes > b.pokes) {
//     return 1
//   } else {
//     return 0
//   }
// })

const format = ({id, pokes, label}) => {

  return id + "\n" + pokes + "\n" + label + "\n\n"
}

fs.writeFileSync(outfile, teams.map(data => format(data)).join(''))
