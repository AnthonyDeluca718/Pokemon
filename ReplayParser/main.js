let replays = [
  'http://replay.pokemonshowdown.com/smogtours-gen3ou-234852',
  'http://replay.pokemonshowdown.com/smogtours-gen3ou-234513',
  'http://replay.pokemonshowdown.com/smogtours-gen3ou-233931',
  'http://replay.pokemonshowdown.com/smogtours-gen3ou-233535',
  'http://replay.pokemonshowdown.com/smogtours-gen3ou-234679'
]

const writeResults = require('./writeResults')

writeResults(replays, 'outfile')
