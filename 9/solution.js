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
	│ 4 ┌──┐      │ 4  ##       │
	│ 3 └──┼┐     │ 3   ##      │
	│ 2 ──>┼┘     │ 2 ## #      │
	│ 1    │      │ 1    #      │
	│ 0 ───┘      │ 0 ###       │
	│   01234     │   01234     │
	│             │             │
	└─────────────┴─────────────┘
*/

const invert = move => ({U: 'D', R: 'L', D: 'U', L: 'R'}[move]);

const getNewPosition = (position, move) => {
	let [x, y] = Array.from(position);
	switch (move) {
		case 'U': y++; break;
		case 'R': x++; break;
		case 'D': y--; break;
		case 'L': x--; break;
	}
	return [x, y];
}

const placeholder = moves => moves
	.split('\n')
	.map(item => item[0].repeat(item[2]))
	.join('').split('')
	.reduce(([prevHead, tiles], move, index, array) => {
		const prevTail = tiles.slice(-1)[0]
		const prevMove = array[index -1] ?? '';
		
		const head = getNewPosition(prevHead, move);



// 		if (move.includes(prevMove)) return [1, [...tiles, position]]; // straight
// 
// 		if (distance && move == invert(prevMove)) return  [0, tiles]; // back
// 
// 		return [1, tiles]; // diagonal

	}, [ [0,0], [[0,0]] ])[2]
	// .filter((tile, index, array) => array.indexOf(tile) === index)
	// .length

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
