teams = []
file = File.open(ARGV[0], "r").read

def parse_team(str)
  output = []

  pokes = str.split(") ")
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

leads = teams.map { |t| t[0] }
lead_counts = Hash.new(0)

leads.each do |lead|
  lead_counts[lead] += 1
end
lead_counts = lead_counts.sort_by {|key, val| -val}
lead_total = leads.length

# lead_counts.each do |key, val|
#   puts "#{key}: #{(val.fdiv(lead_total)*100).round(2)}%"
# end


teams.select! do |team|
  team.length >= 5
end

poke_counts = Hash.new(0)
teams.each do |team|
  team.each do |poke|
    poke_counts[poke] += 1
  end
end
team_total = teams.length
poke_counts = poke_counts.sort_by {|key, val| -val}
poke_counts.each do |key, val|
  puts "#{key}: #{(val.fdiv(team_total)*100).round(2)}%"
end
