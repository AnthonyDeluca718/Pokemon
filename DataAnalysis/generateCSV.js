function convertArrayOfObjectsToCSV ({data, header}) {
  const columnDelimiter = ','
  const lineDelimiter = '\n'

  const keys = Object.keys(data[0])

  let result = ''
  result += '' + columnDelimiter + header.join(columnDelimiter)
  result += lineDelimiter

  data.forEach(function (item, idx) {
    result += header[idx] + columnDelimiter
    let ctr = 0
    keys.forEach(function (key) {
      if (ctr > 0) result += columnDelimiter

      let property = item[key].toString().replace(/"/g, '\\"')
      result += `"${property}"`
      ctr++
    })
    result += lineDelimiter
  })

  return result
}

module.exports = {
  convertArrayOfObjectsToCSV
}

function generateCSV (mus, categories) {
  const keys = Object.keys(categories).filter(key => key !== 'Ignore')

  const rows = keys.map(row => {
    return keys.map(col => {
      if (row === col) {
        return '-'
      } else {
        const noSwap = row < col
        const id = noSwap ? `${row} vs ${col}` : `${col} vs ${row}`
        const mu = mus[id]

        if (!mu) {
          return '-'
        }
        const wins = mu.filter(battle => battle.win).length
        const length = mu.length
        const winrate = noSwap ?  Math.floor((wins / length) * 100) : 100 - Math.floor((wins / length) * 100)

        return `${winrate}%`
      }
    })
  })

  return convertArrayOfObjectsToCSV({
    data: rows,
    header: keys
  })
}

module.exports = generateCSV
