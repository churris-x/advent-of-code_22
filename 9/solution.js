const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*
	This is way more complex than I thought...
	Ah ok the tail warps on diagonals jesus, prefessor rework here we go
	save position as []

	┌─────────────┬─────────────┐
	│head         │tail         │
	├─────────────┼─────────────┤
	│             │             │
	│   012345    │   012345    │
	│ 4  ┌──┐     │ 4   ##      │
	│ 3  └──┼┐    │ 3    ##     │
	│ 2 ──>─┼┘    │ 2  ####     │
	│ 1     │     │ 1     #     │
	│ 0 ────┘     │ 0 ####      │
	│   012345    │   012345    │
	│             │             │
	└─────────────┴─────────────┘

	head
	example  00 10 20 30 40 41 42 43 44 34 24 14 13 23 33 43 53 52 42 32 22 12 02 12 22
	function 00 10 20 30 40 41 42 43 44 34 24 14 13 23 33 43 53 52 42 32 22 12 02 12 22
	
	tail     
	example  00    10 20 30    41 42 43    34 24          33 43          32 22 12         length = 14, unique 13
 */

const invert = move => ({U: 'D', R: 'L', D: 'U', L: 'R'}[move]);

const movePosition = (move, position, dir = 1) => {
	let [x, y] = Array.from(position);
	switch (move) {
		case 'U': y = y + (1 * dir); break;
		case 'R': x = x + (1 * dir); break;
		case 'D': y= y - (1 * dir); break;
		case 'L': x= x - (1 * dir); break;
	}
	return [x, y];
}

const getDistance = (head, tail) => [Math.abs(head[0] - tail[0]), Math.abs(head[1] - tail[1])];

const placeholder = moves => moves
	.split('\n')
	.map(item => item[0].repeat(item[2]))
	.join('').split('')
	.reduce(([prevHead, tiles], move, index, array) => {
		const prevTail = tiles.slice(-1)[0]
		const prevMove = array[index -1] ?? '';	
		
		const head = movePosition(move, prevHead );
		const [dx, dy] = getDistance(head, prevTail);


		if (dx + dy > 2) return [head, [...tiles, movePosition(move, head, -1)]];
		if (dx > 1 || dy > 1) return [head, [...tiles, movePosition(move, prevTail)]];
		return [head, tiles];

	}, [ [0,0], [[0,0]] ])[1]
	// .filter((tile, index, array) => array.indexOf(tile) === index)
	// .length


	// console.log(movePosition('R', [1, 2]));
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
