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

	distance can only be 1 or less, hmm I think I need to list all posible configurations


	== RRRR ==
	......
	......
	......   { distance: 0, prevMove: '', tiles: 0 }
	......
	TH....

	......
	......
	......
	......
	sTH...

	......
	......
	......
	......
	s.TH..

	......
	......
	......
	......
	s..TH.


	distance 1 and prevMove == move means the rope is taught
	
	distance 1 + any move will become loose unless it is the same as prev move, 
	in which case add 1 tile and continue taught
	
	distane 0 is always loose, and will always become taught 

*/

const opposite = {U: 'D', R: 'L', D: 'U', L: 'R'}

const placeholder = moves => moves
	.split('\n')
	.map(item => item[0].repeat(item[2]))
	.join('').split('')
	.reduce(([distance, prevMove, tiles], move) => {

		console.log({distance, prevMove, tiles});

		if (distance && move.includes(prevMove)) return [1, move, tiles + 1]
		if (distance && move == opposite[move]) return [0, move, tiles + 1]

		return [1, move, tiles]
	}, [ 0, '', 0])

 // console.log('1) eg: ', placeholder('R 4'));
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
