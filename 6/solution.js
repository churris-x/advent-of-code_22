const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

/*
Buffer                         | Marker | data stream begins after 
-------------------------------------------------------------------------------
mjqjpqmgbljsphdztnvjfqwrcgsmlb:    jpqm   character 7 
bvwbjplbgvbhsrlpgdmjqwftvncz:      vwbj   character 5
nppdvjthqldpwncqszvftbrmjlhg:      pdvj   character 6
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: rfnt   character 10
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw:  zqfr   character 11
*/

// Part 1 ---------------------------------------------------------------------

const getMarker = buffer => [...buffer].reduce((marker, item, index) => {
	const sum = `${marker}${item}`;
	if (sum.length === 4 && [...sum].every(i => [...sum.matchAll(i)].length === 1)) return sum;
	return `${marker}${item}`;
}, '');
console.log(getMarker(eg.split('\n')[0]));

console.log(getMarker(eg.split('\n')[0]));
console.log(getMarker(eg.split('\n')[1]));
console.log(getMarker(eg.split('\n')[2]));
console.log(getMarker(eg.split('\n')[3]));
// console.log(getMarker(input));

// Part 2 ---------------------------------------------------------------------

// console.log(placeholder(eg));
// console.log(placeholder(input));

/*
Wrong guesses:

Correct:
	1) 
	2) 
*/
