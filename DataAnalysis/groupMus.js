const records = require('./TempData/gsc-full-data.json')
const tags = require('./TempData/gsc-full-team-tags.json')
const fs = require('fs')
const path = require('path')
const outfile = path.join(__dirname, 'Output', 'gsc-post-spl9-mus')


// const groupings = {
//   'Skarm_Mag': 'TSS',
//   'Physical_Mag': 'Spikeless_Offense',
//   'Skarm_Spikes': 'TSS',
//   'Mixed_Offense': 'Spikeless_Offense',
//   'Spikeless_Balance': 'Other',
//   'Forre_Spikes': 'TSS',
//   'Special_Offense': 'Spikeless_Offense',
//   'Jolteon_Skarm': 'TSS',
//   'Physical_Offense': 'Spikeless_Offense',
//   'Cloyster_Spikes': 'Other',
//   'Misc': 'Other',
//   'Incomplete': 'Ignore'
// }


function getTag(id) {
  const target = tags.find(tag => tag.id === id)

  // return groupings[target.tag]
  return target.tag === 'Misc' || target.tag === 'Incomplete' ? 'Ignore' : target.tag
}

let mus = {}
function addMu({name, data}) {
  if (!mus[name]) {
    mus[name] = []
  }

  mus[name].push(data)
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
  const noSwap = tag1 < tag2

  const isMirror = tag1 === tag2
  const ignore = tag1 === 'Ignore' || tag2 === 'Ignore'
  const muName = noSwap ? `${tag1} vs ${tag2}` : `${tag2} vs ${tag1}`
  const win = noSwap ? winner === p1Name : winner === p2Name
  const p1Win = winner === p1Name

  const muData = {
    isMirror,
    win,
    url
  }

  if (!ignore) {
    addMu({
      name: muName,
      data: muData
    })
  }

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

function displayMuData(mu, title) {
  const isMirror = mu[0].isMirror

  const wins = mu.filter(battle => battle.win).length
  const length = mu.length
  const winrate = isMirror ? '50%' : Math.floor((wins / length) * 100) + '%'

  const battles = mu.map(battle => battle.url)

  const lines = [
    title,
    'Winrate: ' + winrate,
    '',
    'Links:'
  ].concat(battles)

  return lines.join("\n")
}

const categoryData = Object.keys(categories).sort().filter(key => key !== 'Ignore')
.map(key => displayCategory(categories[key], key))

const categoryString = categoryData.join("\n")

const muStrings = Object.keys(mus).sort().map(key => displayMuData(mus[key], key))
const muOutput = muStrings.join("\n\n")

const output = categoryString + "\n\n\n" + muOutput

fs.writeFileSync(outfile, output)
// fs.writeFileSync(csvfile, generateCSV(mus, categories))
