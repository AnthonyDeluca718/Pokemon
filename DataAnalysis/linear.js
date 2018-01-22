
const fs = require('fs')
const path = require('path')

// const invite = require('./TempData/linear.json')
// const outfile = path.resolve(__dirname, 'linear-players.json') //add outfile here
//
// const players = invite.map(({p1, p2, url}) => {
//   return ({
//     p1: p1.name,
//     p2: p2.name,
//     line: "x"
//   })
// })
//
// fs.writeFileSync(outfile, JSON.stringify(players, null, 2))

const linearPlayers = require('./linear-players.json')
const invite = require('./TempData/linear.json')

let linearTeams = []

invite.forEach(({p1, p2, line}, idx) => {
  const linearIdx = linearPlayers[idx].line

  const linear = linearIdx === 'p1' ? p1 : p2

  linearTeams.push(linear)
})

const alts = ['1inear', 'The Dollar Auction', 'thecurvyline']
const linear2 = require('./TempData/linear2.json')
const linearTeams2 = []

linear2.map(({p1, p2}) => {
  if (alts.includes(p1.name)) {
    linearTeams2.push(p1)
  } else if (alts.includes(p2.name)) {
    linearTeams2.push(p2)
  } else {
    console.log(p1.name + " - " + p2.name)
  }
})

// linearTeams = linearTeams.concat(linearTeams2)

let pokes = {}
let games = 0
let unrevealed = 0

function addPokemon(poke) {
  if (pokes[poke]) {
    pokes[poke] += 1
  } else {
    pokes[poke] = 1
  }
}

function addAllPokes (player) {
  const mons = player.pokes.map(poke => poke.name)
  const num = mons.length

  games += 1
  unrevealed += 6 - num

  mons.forEach(mon => addPokemon(mon))
}

linearTeams.forEach(team => addAllPokes(team))

const pokeArr = Object.keys(pokes).map(key => {
  return {poke: key, num: pokes[key]}
})

const sorted = pokeArr.sort((a,b) => {
  if (a.num < b.num) {
    return 1
  } else if (a.num === b.num){
    return 0
  } else {
    return -1
  }
})

function display({poke, num}) {
  const use = Math.round(1000 * num / games) / 10

  return `${poke}: ${use}%`
}

const outfile = path.resolve('./linear-userates-old') //add outfile here
const output = sorted.map(display).join('\n')

fs.writeFileSync(outfile, output)
