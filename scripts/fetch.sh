#!/bin/bash

# If no days are passed, prompt user
DAYS=$@;
if [ -z "$1" ]; then
	read -p 'Days: ' days
	DAYS=$days;
fi;

echo $DAYS |
tr ' ' '\n' |
xargs -I @ node --no-warnings fetchInput.js @ 
