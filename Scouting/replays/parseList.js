var arrStr = process.argv[2]
var format = "[" + process.argv[3] + "]"
var fs = require('fs')

var arr = JSON.parse(arrStr)
var output = []

arr.forEach(el => {
  var tier = el[0].split(" ")[0]
  var title = el[0].split(" ").splice(1).join(" ")
  var url = el[1]

  if (tier == format) {
    output.push(`${title}: ${url}`)
  }
})
console.log(JSON.stringify(output))
