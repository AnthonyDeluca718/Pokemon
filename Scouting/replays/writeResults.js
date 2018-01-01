const fs = require('fs')
const axios = require('axios')
const path = require('path')
const arrString = process.argv[2]
const name = process.argv[3]
const format = process.argv[4]
const parseReplay = require('../../ReplayParser/parseReplay')
const pokeString = require('../../ReplayParser/pokeString')

const outfile = path.resolve(__dirname, '../output', `${name}-${format}`)
const input = JSON.parse(arrString)

let output = []
const promises = input.map(battle => {
  const url = battle.split(': ')[1]
  return axios.get(url).then( res => {
    const {winner, p1, p2} = parseReplay(res.data)

    const noSwap = p1.name.includes(name)
    const opponent = noSwap ? p2.name : p1.name
    const title = `${opponent}: ${url}`
    const pokes1 = p1.pokes.map(pokeString).join(' ')
    const pokes2 = p2.pokes.map(pokeString).join(' ')

    const lines = noSwap ? [title, pokes1, 'VS', pokes2] : [title, pokes2, 'VS', pokes1]
    output.push(lines.join('\n'))
  })
  .catch(err => console.log(err))
})

axios.all(promises)
.then(() => fs.writeFileSync(outfile, output.join('\n\n')))
.catch(err => console.log(err))
