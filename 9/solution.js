const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*
	Save position as [x, y] and keep track of Head position

	┌─────────────┬─────────────┐
	│head         │tail         │
	├─────────────┼─────────────┤
	│             │             │
	│   012345    │   012345    │
	│ 4 ·┌──┐·    │ 4 ··##··    │
	│ 3 ·└──┼┐    │ 3 ···##·    │
	│ 2 ──>─┼┘    │ 2 ·####·    │
	│ 1 ····│·    │ 1 ····#·    │
	│ 0 s───┘·    │ 0 ####··    │
	│   012345    │   012345    │
	│             │             │
	└─────────────┴─────────────┘

	head 00 10 20 30 40 41 42 43 44 34 24 14 13 23 33 43 53 52 42 32 22 12 02 12 22
	tail 00    10 20 30    41 42 43    34 24          33 43          32 22 12
    tail -> length = 14, unique 13
 */

const invert = move => ({ U: 'D', R: 'L', D: 'U', L: 'R' }[move]);

const movePosition = (move, position) => {
	let [x, y] = position;
	switch (move) {
		case 'U': y++; break;
		case 'R': x++; break;
		case 'D': y--; break;
		case 'L': x--; break;
	}
	return [x, y];
}

const getDistance = (head, tail) => [head[0] - tail[0], head[1] - tail[1]];

const getTailMoves = moves => moves
 	.split('\n')
  	.map(item => item[0].repeat(item.split(' ')[1]))
  	.join('').split('')
  	.reduce(([prevHead, tiles], move, index, array) => {
  		const prevTail = tiles.slice(-1)[0]
  		
  		const head = movePosition(move, prevHead);

  		const [dx, dy] = getDistance(head, prevTail)
  			.map(i => Math.abs(i));

	 	if (dx > 1 || dy > 1) {
	 		return [head, [...tiles, prevHead]];
	 	}

  		return [head, tiles];
  	}, [[0,0], [[0,0]]])[1]
	.map(item => `${item[0]},${item[1]}`)
	.filter((tile, index, array) => array.indexOf(tile) === index)
	.length


// console.log('1) eg: ', getTailMoves(eg.split('\n').slice(0, 8).join('\n')));
// console.log('1) input: ', getTailMoves(input));

// Part 2 ---------------------------------------------------------------------
/*
	ok the idea is that there are now more knots, the one previous is the head
	for the next one.

	Need a function that will update all positions respectively.
	knots = prevKnows, move => stuff

	ok I think I know the issue here, when the rope was a "knot" or a loop, the
	behaviour changes
*/

const largeEg = eg.split('\n').slice(9, 17).join('\n');

const updateKnots = (knots, move) => knots.reduce((rope, knot, index) => {
 	const head = rope[index -1];
 	if (!head) return [movePosition(move, knot)];

	const [dx, dy] = getDistance(head, knot);

 	if (Math.abs(dx) > 1 || Math.abs(dy) > 1) return [
 		...rope, 
 		[knot[0] + Math.sign(dx), knot[1] + Math.sign(dy)]
 	];
 	
 	return [...rope, knot];
 }, []);

const getRopeMoves = moves => moves
	.split('\n')
  	.map(item => item[0].repeat(item.split(' ')[1]))
  	.join('').split('')
  	.reduce(([prevKnots, tiles], move) => {
  		const prevTail = tiles.slice(-1)[0]
  		
  		const knots = updateKnots([...prevKnots, prevTail], move);
  		
  		return [knots.slice(0, -1), [...tiles, knots.slice(-1)[0]]];
  	}, [[...Array(9)].map(i => [0,0]), [[0,0]] ])[1]
	  .map(item => `${item[0]},${item[1]}`)
	  .filter((tile, index, array) => array.indexOf(tile) === index)
	  .length

	console.log('2) eg: ', getRopeMoves(eg.split('\n').slice(0, 8).join('\n')));
	console.log('2) large eg: ', getRopeMoves(largeEg));
	console.log('2) input: ', getRopeMoves(input));

/*
Wrong guesses:
	1) 3045 too low
	1) 4564 too low
	1) 5000 too low
	1) 12000
	1) 3025
	1) 6833
Correct:
	1) 6067
	2) 2471
*/
