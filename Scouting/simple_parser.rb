teams = []
file = File.open(ARGV[0], "r").read

file.each_line do |line|
  if (line.length < 20 || line[0..3] == "http" || line[0..2] == "===")
    next
  elsif (line[0] == '#')
    teams.push(line[2..-1]) if ARGV[1] == "include"
  else
    teams.push(line)
  end
end

def parse_team(str)
  output = []

  pokes = str.split(",")
  pokes.map! do |poke|
    poke.strip!
    paren = poke.index("(")

    if paren
      output.push(poke[0...paren].capitalize)
    else
      output.push(poke.capitalize)
    end
  end

  output
end

pokemon_count = Hash.new(0)
teams.each do |team|
  pokes = parse_team(team)
  pokes.each do |poke|
    if poke.include?("[")
      poke = poke.split(" ")[0]
    end
    pokemon_count[poke]+=1 unless poke.length < 2
  end
end

counts = pokemon_count.sort_by {|key, val| -val}
total = teams.length

use_rates = []
counts.each do |poke, count|
  use_rates.push([poke, (100*count.fdiv(total)).round(2)  ])
end

use_rates.each do |pair|
  puts "#{pair[0]}: #{pair[1]}";
end
