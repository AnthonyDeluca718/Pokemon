ARR="$(bash ./bash/replays.sh "$1")"
OUTPUT="$(node ./replays/parseList.js "$ARR" $2)"
# node ./replays/test.js "$OUTPUT"
node ./replays/writeResults.js "$OUTPUT" "$1" "$2"
