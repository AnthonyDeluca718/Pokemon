const recordsArr = require('./TempData/adv-full-data.json')
const tagsArr = require('./TempData/adv-full-tags.json')
const fs = require('fs')
const path = require('path')
const outfile = path.join(__dirname, 'Output', 'newstuff-winrate-by-tag')

const tags = {}
recordsArr.forEach(record => {
  const id = record.id
  if (tags[id]) {
    console.log('error')
    console.log(id)
    console.log(tags[id])
    console.log(record.tag)
  } else {
    tags[id] = record.tag
  }
})

const hash = {}
tagsArr.forEach(tag => {
  const id = tag.id
  if (hash[id]) {
    console.log('error')
    console.log(id)
    console.log(hash[id])
    console.log(tag.tag)
  } else {
    hash[id] = tag.tag
  }
})

// function getTag(id) {
//   const target = tags.find(tag => tag.id === id)
//
//   return target.tag
// }
//
// const categories = {}
// function addResultToCategories ({category, win, isMirror}) {
//   if (!categories[category]) {
//     categories[category] = {
//       wins: 0,
//       games: 0,
//       mirrors: 0
//     }
//   }
//
//   const target = categories[category]
//   if (isMirror) {
//     target.mirrors += 1
//   } else {
//     target.games += 1
//     target.wins = win ? categories[category].wins + 1 : categories[category].wins
//   }
// }
//
// function displayCategory({wins, games, mirrors}, title) {
//   const winrate = games ? Math.floor((wins / games) * 100) + '%' : 'All Mirrors'
//   const mirrorString = mirrors ? ` (${mirrors} mirrors)` : ''
//
//   return `${title}: ${winrate} - Games: ${games + mirrors}` + mirrorString
// }
//
// records.forEach(({p1, p2, id, url, winner}) => {
//   const p1Name = p1.name
//   const p2Name = p2.name
//
//   const id1 = id + '-p1'
//   const id2 = id + '-p2'
//
//   const tag1 = db[id1]
//   const tag2 = db[id2]
//
//   if (!tag1 || !tag2) {
//     console.log('db error')
//   }
//
//   const isMirror = tag1 === tag2
//   const p1Win = winner === p1Name
//
//   addResultToCategories({
//     category: tag1,
//     win: p1Win,
//     isMirror
//   })
//   addResultToCategories({
//     category: tag2,
//     win: !p1Win,
//     isMirror
//   })
// })
//
// const lines = Object.keys(categories).filter(key => key !== 'Incomplete').map(key => displayCategory(categories[key], key))
//
// fs.writeFileSync(outfile, lines.join("\n"))
