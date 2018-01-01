function parseReplay(html) {
  let input = html.split("\n")

  let pokes1 = []
  let pokes2 = []
  let p1Name = ""
  let p2Name = ""

  let active1 = null
  let active2 = null

  let winner = null

  for(let i=0; i< input.length; i++) {
    let str = input[i].trim();

    if (str[0] !== "|") {
      continue;
    }

    let sections = str.split("|")

    if (sections[1] === "switch" || sections[1] === "drag") {
      // console.log(str)
      let player_nick = sections[2].split(":")
      let player = player_nick[0]
      let nick = player_nick[1].trim()

      let poke_section = sections[3]
      let commaIdx = poke_section.indexOf(",")

      let pokemon
      if (commaIdx >= 0) {
        pokemon = poke_section.substring(0, commaIdx)
      } else {
        pokemon = poke_section
      }

      let current
      if (player === "p1a") {
        current = pokes1.find( function(poke) { return poke.name === pokemon })

        if (!current) {
          let new_poke = {name: pokemon, moves: [], item: ""}
          pokes1.push(new_poke)
          active1 = new_poke
        } else {
          active1 = current
        }
      } else if (player === "p2a") {

        current = pokes2.find( function(poke) { return poke.name === pokemon })

        if (!current) {
          let new_poke = {name: pokemon, moves: [], item: ""}
          pokes2.push(new_poke)
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
      let player = sections[2].substring(0,3)
      let move = sections[3].replace(" ", "-")

      let moves
      if (player === "p1a") {
        moves = active1.moves
      } else if (player === "p2a") {
        moves = active2.moves
      }

      if (!moves.includes(move)) {
        moves.push(move)
      }
    } else if (sections[1] === "player") {

      let tempName = sections[3]

      if (tempName) {
        let tempPlayer = sections[2].substring(0,2)

        if (tempPlayer === "p1") {
          p1Name = sections[3]
        } else if (tempPlayer === "p2") {
          p2Name = sections[3]
        }
      }
    }
  }

  return {
    winner,
    p1: {
      name: p1Name,
      pokes: pokes1
    },
    p2: {
      name: p2Name,
      pokes: pokes2
    }
  }
}

module.exports = parseReplay
