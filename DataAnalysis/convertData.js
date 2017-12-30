const fs = require('fs')
const path = require('path')
const records = require('./spl7-data.json')
const outfile = path.resolve(__dirname, 'outfile')

function format (data) {
  const pokes1 = data.p1.pokes.map(poke => poke.name).join(' ')
  const pokes2 = data.p2.pokes.map(poke => poke.name).join(' ')

  return data.id + '-p1' + "\n" + pokes1 + "\n" + "Main: " + "\n\n" + data.id + '-p2' + "\n" +  pokes2 + "\n" + "Main: " + "\n\n"
}

fs.writeFileSync(outfile, records.map(data => format(data)).join(''))
