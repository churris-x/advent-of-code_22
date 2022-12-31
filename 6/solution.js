const fs = require('fs');
const eg = fs.readFileSync('./eg.txt').toString().slice(0, -1);
const input = fs.readFileSync('./input.txt').toString().slice(0, -1);

/*
bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11
*/

// Part 1 ---------------------------------------------------------------------

const getMarker = buffer => [...buffer].reduce((marker, item, index) => {
	const sum = `${marker}${item}`;
	if (sum.length === 4 && [...sum].every(i => [...sum.matchAll(i)].length === 1)) return sum;
	return `${marker}${item}`;
}, '');

console.log(getMarker(eg.split('\n')[0]));
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
