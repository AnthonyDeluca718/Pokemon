file = File.open('AllTeams', 'r')
outfile = File.open('AllTeams-Shorten', 'w')

file.each_line do |line|
  line.strip!
  if line[0..2] === '===' && line.include?("\+")
    sections = line.split("\+")
    new_line = sections[0..2].join(" ")
    outfile.puts new_line
  else
    outfile.puts line
  end
end
