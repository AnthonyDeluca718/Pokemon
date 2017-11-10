function parseReplay(html, name) {
  var input = html.split("\n");

  var pokes1 = [];
  var pokes2 = [];
  var p1Name = "";
  var p2Name = "";

  var active1 = null;
  var active2 = null;

  var winner = null;

  //just need to add code to figure out the winner to have the basic version
  //advanced version also needs the movesets

  for(let i=0; i< input.length; i++) {
    var str = input[i].trim();

    if (str[0] !== "|") {
      continue;
    }

    let sections = str.split("|");

    if (sections[1] === "switch" || sections[1] === "drag") {
      // console.log(str);
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

    } else if (sections[1] === "win") {
      winner = sections[2].replace("</script>", "");
    } else if (sections[1] === "-heal" && sections[4] === "[from] item: Leftovers") {
      let player = sections[2].substring(0,3);

      if (player === "p1a") {
        active1.item = "leftovers";
      } else if (player === "p2a") {
        active2.item = "leftovers";
      }
    } else if (sections[1] === "move") {
      let player = sections[2].substring(0,3);
      let move = sections[3].replace(" ", "-");

      let moves;
      if (player === "p1a") {
        moves = active1.moves;
      } else if (player === "p2a") {
        moves = active2.moves;
      }

      if (!moves.includes(move)) {
        moves.push(move)
      }
    } else if (sections[1] === "player") {

      let tempName = sections[3];

      if (tempName) {
        let tempPlayer = sections[2].substring(0,2);

        if (tempPlayer === "p1") {
          p1Name = sections[3];
        } else if (tempPlayer === "p2") {
          p2Name = sections[3];
        }
      }
    }

  }

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

  let dispPokes1 = pokes1.map(pokeString);
  let dispPokes2 = pokes2.map(pokeString);

  if (p1Name.toUpperCase() === name.toUpperCase()) {
    return(`${winner} wins.` + "\n" + dispPokes1.join(", ") + "\n" + "--- VS" + "\n" + dispPokes2.join(", ") + "\n" )
  } else if (p2Name.toUpperCase() === name.toUpperCase()) {
    return(`${winner} wins.` + "\n" + dispPokes2.join(", ") + "\n" + "--- VS" + "\n" + dispPokes1.join(", ") + "\n" )
  } else {
    return "error";
  }
}

exports.parseReplay = parseReplay;


// var fs = require('fs');
// var string = fs.readFileSync("./ex.html", "utf-8");
//
// var outfile = fs.createWriteStream("./outfile");
// outfile.write(parseReplay(string, "CZ") );

// console.log(parseReplay(string));

// old code
//
// else if (false) {
//   let choice1 = sections[2].split(" "), choice2 = sections[3].split(" ");
//
//   if (choice1[0].substring(0,4) === "move") {
//     moves1 = active1.moves;
//
//     if (!moves1.includes(choice1[1])) {
//       moves1.push(choice1[1])
//     }
//   }
//
//   if (choice2[0].substring(0,4) === "move") {
//     moves2 = active2.moves;
//
//     if (!moves2.includes(choice2[1])) {
//       moves2.push(choice2[1])
//     }
//   }
// }
