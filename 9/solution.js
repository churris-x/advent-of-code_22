const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/* 
	I think I can be very cheap for this first step, just calculate when the tail moves
	maybe a distance value between the rope and an angle? 
	quickly changing directions is the tricky bit

	H             0
	TH            1
	T.H -> TH     2 -> 1

	distance can only be 1 or less
*/

const placeholder = moves => moves
	.split('\n')
	// .map(item => item[0].repeat(item[2]))
	.map(item => 'R'.repeat(item[2])) // delete this
	.join('').split('')
 	.reduce(({distance, angle, prevMove, tiles}, move) => {
 
 		if (move.includes(prevMove)) {

 		}


 
	}, {distance: 0, angle: false, prevMove: '', tiles: 0})

console.log('1) eg: ', placeholder(eg));
 // console.log('1) input: ', placeholder(input));

// Part 2 ---------------------------------------------------------------------

// console.log('2) eg: ', placeholder(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:

Correct:
	1) 
	2) 
*/
