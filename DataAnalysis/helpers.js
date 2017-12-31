function convertArrayOfObjectsToCSV (args) {
  let data = args.data || null
  if (data == null || !data.length) {
    return null
  }

  const columnDelimiter = args.columnDelimiter || ','
  const lineDelimiter = args.lineDelimiter || '\n'

  const keys = args.keys || Object.keys(data[0])

  let result = ''
  result += keys.join(columnDelimiter)
  result += lineDelimiter

  data.forEach(function (item) {
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
