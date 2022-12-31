read -p 'Days: ' days &&
eval echo $days |
tr ' ' '\\n'|
xargs -I @ node fetchInput.js @