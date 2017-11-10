var fs = require('fs');

var string = fs.readFileSync("another.html", 'utf8');
var input = string.split("\n");

var outfile = fs.createWriteStream("outfile");

var pokes1 = [];
var pokes2 = [];

var active1 = null;
var active2 = null;

//just need to add code to figure out the winner to have the basic version
//advanced version also needs the movesets

for(let i=0; i< input.length; i++) {
  var str = input[i].trim();

  if (str[0] !== "|") {
    continue;
  }

  let sections = str.split("|");

  if (sections[1] == "switch") {
    let player_nick = sections[2].split(":");
    let player = player_nick[0];
    let nick = player_nick[1].trim();


    let poke_section = sections[3];
    let commaIdx = poke_section.indexOf(",");

    let pokemon;
    if (commaIdx >= 0) {
      pokemon = poke_section.substring(0, commaIdx);
    } else {
      pokemon = poke_section;
    }

    let current;
    if (player === "p1a") {

      current = pokes1.find( function(poke) { return poke.name === pokemon });

      if (!current) {
        let new_poke = {name: pokemon, moves: []}
        pokes1.push(new_poke);
        active1 = new_poke
      } else {
        active1 = current;
      }
    } else if (player === "p2a") {

      current = pokes2.find( function(poke) { return poke.name === pokemon });

      if (!current) {
        let new_poke = {name: pokemon, moves: []}
        pokes2.push(new_poke);
        active2 = new_poke
      } else {
        active2 = current;
      }

    } else {
      errors.push(str);
    }

    // outfile.write(str + "\n");
    // outfile.write(player + "\n");
    // outfile.write(nick + "\n");
    // outfile.write(pokemon + "\n");

  } else if (sections[1] == "move") {
    // outfile.write(str + "\n");
    //
    // var player_poke = sections[1];
    // var move = sections[2];
  } else if (sections[1] == "choice") {
    outfile.write(str + "\n");
    let choice1 = sections[2].split(" "), choice2 = sections[3].split(" ");

    if (choice1[0].substring(0,4) === "move") {
      moves1 = active1.moves;

      if (!moves1.includes(choice1[1])) {
        moves1.push(choice1[1])
      }
    }

    if (choice2[0].substring(0,4) === "move") {
      moves2 = active2.moves;

      if (!moves2.includes(choice2[1])) {
        moves2.push(choice2[1])
      }
    }
  }

}

function pokeString(poke) {
  var moveString = "("
  poke.moves.forEach( function(move) {
    moveString = moveString + move +" ";
  })
  moveString = moveString.trim().concat(")");

  return poke.name + " " + moveString;
}

dispPokes1 = pokes1.map(pokeString);
dispPokes2 = pokes2.map(pokeString);

outfile.write("\n" + "===Pokemon===" + "\n");
outfile.write(dispPokes1 + "\n");
outfile.write(dispPokes2 + "\n");
