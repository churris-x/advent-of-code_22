read -p 'Days: ' days &&
eval echo $days |
tr ' ' '\n'|
xargs -I @ node --no-warnings fetchInput.js @ 
