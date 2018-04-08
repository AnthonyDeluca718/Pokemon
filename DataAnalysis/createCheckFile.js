const fs = require('fs')
const path = require('path')
const records = require('./TempData/adv-full-data.json')
const tagsArr = require('./TempData/adv-full-tags.json')
const outfile = path.resolve(__dirname, 'ADV-full-labels')

const tags = {}
tagsArr.forEach(tag => {
  const id = tag.id
  if (tags[id]) {
    console.log('error')
    console.log(id)
    console.log(tags[id])
    console.log(tag.tag)
  } else {
    tags[id] = tag.tag
  }
})

let teams = []
records.forEach((match, idx) => {
  const id = match.id
  const pokes1 = match.p1.pokes.map(poke => poke.name).join(' ')
  const pokes2 = match.p2.pokes.map(poke => poke.name).join(' ')


  const found1 = tags[id + '-p1']
  const found2 = tags[id + '-p2']

  if (!found1 || !found2) {
    console.log(id)
    console.log('effor')
  }

  const label1 = found1 ? found1 : ' '
  const label2 = found2 ? found2 : ' '

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

  return id + "\n" + pokes + "\n" + `Main: ${label}` + "\n\n"
}

fs.writeFileSync(outfile, teams.map(data => format(data)).join(''))
