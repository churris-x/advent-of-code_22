read -p 'Days: ' days &&
read -p 'Are you sure? [y/n]: ' yes &&
if [ $yes == 'y' ]; then
	eval echo $days |
	tr ' ' '\\n' |
	xargs -I @ rm @/input.txt && eval echo Deleted input for $days;
fi