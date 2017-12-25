const fs = require('fs')
const axios = require('axios')

axios.get('https://replay.pokemonshowdown.com/gen5ou-677039385')
.then(res => {
  fs.writeFileSync('./ReplayParser/test.html', res.data)
})