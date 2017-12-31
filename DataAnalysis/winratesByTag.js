const records = require('./full-data.json')
const tags = require('./full-team-tags.json')
const fs = require('fs')
const path = require('path')
const outfile = path.join(__dirname, 'Output', 'full-winrate-by-tag')

function getTag(id) {
  const target = tags.find(tag => tag.id === id)

  return target.tag
}

const categories = {}
function addResultToCategories ({category, win, isMirror}) {
  if (!categories[category]) {
    categories[category] = {
      wins: 0,
      games: 0,
      mirrors: 0
    }
  }

  const target = categories[category]
  if (isMirror) {
    target.mirrors += 1
  } else {
    target.games += 1
    target.wins = win ? categories[category].wins + 1 : categories[category].wins
  }
}

function displayCategory({wins, games, mirrors}, title) {
  const winrate = games ? Math.floor((wins / games) * 100) + '%' : 'All Mirrors'
  const mirrorString = mirrors ? ` (${mirrors} mirrors)` : ''

  return `${title}: ${winrate} - Games: ${games + mirrors}` + mirrorString
}

records.forEach(({p1, p2, id, url, winner}) => {
  const p1Name = p1.name
  const p2Name = p2.name

  const id1 = id + '-p1'
  const id2 = id + '-p2'

  const tag1 = getTag(id1)
  const tag2 = getTag(id2)

  const isMirror = tag1 === tag2
  const p1Win = winner === p1Name

  addResultToCategories({
    category: tag1,
    win: p1Win,
    isMirror
  })
  addResultToCategories({
    category: tag2,
    win: !p1Win,
    isMirror
  })
})

const lines = Object.keys(categories).filter(key => key !== 'Incomplete').map(key => displayCategory(categories[key], key))

fs.writeFileSync(outfile, lines.join("\n"))
