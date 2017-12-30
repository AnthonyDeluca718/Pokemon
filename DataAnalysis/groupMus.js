const records = require('./spl7-data.json')
const tags = require('./spl7-team-tags.json')
const fs = require('fs')
const path = require('path')
const outfile = path.join(__dirname, 'Output', 'spl7-TSS_Spikeless')

// 'Skarm_Mag', 'Physical_Mag', 'Skarm_Spikes', 'Mixed_Offense', 'Spikeless_Balance', 'Forre_Spikes', 'Special_Offense', 'Incomplete', 'Jolteon_Skarm', 'Physical_Offense', 'Cloyster_Spikes', 'Misc', 'Balanced_Mag'
// Note we always ignore imcomplete. Misc is not obvious to handle

const groupings = {
  'Skarm_Mag': 'TSS',
  'Physical_Mag': 'Spikeless_Offense',
  'Skarm_Spikes': 'TSS',
  'Mixed_Offense': 'Spikeless_Offense',
  'Spikeless_Balance': 'Other',
  'Forre_Spikes': 'TSS',
  'Special_Offense': 'Spikeless_Offense',
  'Jolteon_Skarm': 'TSS',
  'Physical_Offense': 'Spikeless_Offense',
  'Cloyster_Spikes': 'Other',
  'Misc': 'Other',
  'Incomplete': 'Ignore'
}

function getTag(id) {
  const target = tags.find(tag => tag.id === id)

  return groupings[target.tag]
}

let mus = {}
function addMu({name, data}) {
  if (!mus[name]) {
    mus[name] = []
  }

  mus[name].push(data)
}

const categories = {}
function addResultToCategories ({category, win}) {
  if (!categories[category]) {
    categories[category] = {
      wins: 0,
      games: 0
    }
  }

  categories[category].games += 1
  categories[category].wins = win ? categories[category].wins + 1 : categories[category].wins
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
    win: p1Win
  })
  addResultToCategories({
    category: tag2,
    win: !p1Win
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

const categoryData = Object.keys(categories).filter(key => key !== 'Ignore').map(key => {
  const {wins, games} = categories[key]
  const winrate = Math.floor((wins / games) * 100) + '%'
  return `${key}: ${winrate}`
})
const categoryString = categoryData.join("\n")

const muStrings = Object.keys(mus).map(key => displayMuData(mus[key], key))
const muOutput = muStrings.join("\n\n")

const output = categoryString + "\n\n" + muOutput

fs.writeFileSync(outfile, output)
