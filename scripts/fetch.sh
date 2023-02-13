#!/bin/bash

DAYS=$@;
if [ -z "$1" ]; then
	read -p 'Days: ' days
	DAYS=$days;
fi;

echo $DAYS |
tr ' ' '\n'|
xargs -I @ echo node --no-warnings fetchInput.js @ 
