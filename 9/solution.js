const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*
	This is way more complex than I thought...
	Ah ok the tail warps on diagonals jesus, prefessor rework here we go
	save position as [x, y] and keep track of Head position
	fucking shit still cannot do it jesus

	┌─────────────┬─────────────┐
	│head         │tail         │
	├─────────────┼─────────────┤
	│             │             │
	│   012345    │   012345    │
	│ 4  ┌──┐     │ 4   ##      │
	│ 3  └──┼┐    │ 3    ##     │
	│ 2 ──>─┼┘    │ 2  ####     │
	│ 1     │     │ 1     #     │
	│ 0 s───┘     │ 0 ####      │
	│   012345    │   012345    │
	│             │             │
	└─────────────┴─────────────┘

	head 00 10 20 30 40 41 42 43 44 34 24 14 13 23 33 43 53 52 42 32 22 12 02 12 22
	tail 00    10 20 30    41 42 43    34 24          33 43          32 22 12
    tail -> length = 14, unique 13
 */

const invert = move => ({U: 'D', R: 'L', D: 'U', L: 'R'}[move]);

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

const getDistance = (head, tail) => [
	Math.abs(Math.abs(head[0]) - Math.abs(tail[0])),
	Math.abs(Math.abs(head[1]) - Math.abs(tail[1]))
];

const getTailMoves = moves => moves
 	.split('\n')
  	.map(item => item[0].repeat(item[2]))
  	.join('').split('')
  	.reduce(([prevHead, tiles], move, index, array) => {
  		const prevTail = tiles.slice(-1)[0]
  		
  		const head = movePosition(move, prevHead );
  		const [dx, dy] = getDistance(head, prevTail);

  		console.log(dx, dy);

	 	if (dx > 1 || dy > 1) return [head, [...tiles, movePosition(invert(move), head)]];
  		return [head, tiles];
  
  	}, [[0,0], [[0,0]]])[1]
	.map(item => `${item[0]},${item[1]}`)
	.filter((tile, index, array) => array.indexOf(tile) === index)
	.length

	console.log('1) eg: ', getTailMoves(eg));
	console.log('1) input: ', getTailMoves(input));

// Part 2 ---------------------------------------------------------------------

// console.log('2) eg: ', placeholder(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:
	1) 3045 too low
	2) 4564 too low
	2) 5000 too low
	3) 12000
	4) 3025
Correct:
	1) 
	2) 
*/
