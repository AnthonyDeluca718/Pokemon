function pokeString(poke) {
  var moveString = ""
  poke.moves.forEach( function(move) {
    moveString = moveString + move +" ";
  })
  moveString = moveString.trim();

  var ret = poke.name + " (";

  if (poke.item === "leftovers" && !poke.moves.includes("Trick")) { //check
    ret += "Lefties ";
  }

  return ret + moveString + ")";
}

module.exports = pokeString