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

const getMarker = buffer => [...buffer].reduce((marker, character, index) => {
	if (marker) return marker;
	
	const check = buffer.slice(index, index + 4);
	const allUnique = [...check].every((char, index) => check.lastIndexOf(char) === index);
	if (allUnique) return index + 4;

	return '';
}, '');

 console.log(getMarker(eg.split('\n')[0]));
 console.log(getMarker(eg.split('\n')[1]));
 console.log(getMarker(eg.split('\n')[2]));
 console.log(getMarker(eg.split('\n')[3]));
 console.log(getMarker(input));

// Part 2 ---------------------------------------------------------------------

const getMessage = buffer => [...buffer].reduce((marker, character, index) => {
	if (marker) return marker;
	
	const check = buffer.slice(index, index + 14);
	const allUnique = [...check].every((char, index) => check.lastIndexOf(char) === index);
	if (allUnique) return index + 14;

	return '';
}, '');

console.log(getMessage(eg.split('\n')[0]));
console.log(getMessage(eg.split('\n')[1]));
console.log(getMessage(eg.split('\n')[2]));
console.log(getMessage(eg.split('\n')[3]));
console.log(getMessage(input));

/*
Wrong guesses:
	sprm
Correct:
	1) 1779
	2) 2635
*/
