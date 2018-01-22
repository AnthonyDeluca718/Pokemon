teams = []
file = File.open(ARGV[0], "r").read

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

idx = 0
file.each_line do |line|
  line.strip!

  if (line == '')
    idx = 0
    next
  end

  if (idx == 1)
    teams.push parse_team(line)
  end

  idx +=1
end

teams.each do |team|
  puts team
end
