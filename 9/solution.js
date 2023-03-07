const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*
	This is way more complex than I thought...
	Ah ok the tail warps on diagonals jesus, prefessor rework here we go
	save position as []

	┌─────────┬─────────┐
	│head     │tail     │
	├─────────┼─────────┤
	│         │         │
	│ 4 ┌──┐  │ 4  ##   │
	│ 3 │┼┴┼┐ │ 3   ##  │
	│ 2 └─▼├┘ │ 2 ##►#  │
	│ 1    │  │ 1    #  │
	│ 0 ───┘  │ 0 ###   │
	│   01234 │   01234 │
	│         │         │
	└─────────┴─────────┘
*/

const opposite = {U: 'D', R: 'L', D: 'U', L: 'R'};

// const placeholder = moves => moves
// 	.split('\n')
// 	.map(item => item[0].repeat(item[2]))
// 	.join('').split('')
// 	.reduce(([distance, tiles], move, index, array) => {
// 		const prevPosition = tiles.slice(-1)[0]
// 		const prevMove = array[index -1] ?? '';
// 		
// 		let [x, y] = prevPosition
// 			.split(';')
// 			.map(i => i | 0);
// 		switch (move) {
// 			case 'U': y++; break;
// 			case 'R': x++; break;
// 			case 'D': y--; break;
// 			case 'L': x--; break;
// 		}
// 		const position = `${x};${y}`
// 
// 
// 		if (move.includes(prevMove)) {
// 			obj = [1, [...tiles, position]];
// 			console.log('same move', obj);
// 			return obj
// 		}
// 		if (distance && move == opposite[prevMove]) {
// 			obj = [0, tiles];
// 			console.log('backwards', obj);
// 			return obj
// 		}
// 		console.log('diagonal', [1, tiles]);
// 		return [1, tiles];
// 	}, [0, ['0;0']])[2]
// 	.filter((tile, index, array) => array.indexOf(tile) === index)
// 	.length

const placeholder = moves => moves
	.split('\n')
	.map(item => item[0].repeat(item[2]))
	.join('').split('')
	.reduce(([distance, tiles], move, index, array) => {
		const prevPosition = tiles.slice(-1)[0]
		const prevMove = array[index -1] ?? '';
		
		let [x, y] = prevPosition
			.split(';')
			.map(i => i | 0);

		switch (move) {
			case 'U': y++; break;
			case 'R': x++; break;
			case 'D': y--; break;
			case 'L': x--; break;
		}
		const position = `${x};${y}`


		if (move.includes(prevMove)) {
			obj = [1, [...tiles, position]];
			console.log('same move', obj);
			return obj
		}
		if (distance && move == opposite[prevMove]) {
			obj = [0, tiles];
			console.log('backwards', obj);
			return obj
		}

		// still WIP
		switch (prevMove) {
			case 'U': y++; break;
			case 'R': x++; break;
			case 'D': y--; break;
			case 'L': x--; break;
		}
		console.log('diagonal', [1, tiles]);
		return [1, tiles];

	}, [0, ['0;0']])[2]
	// .filter((tile, index, array) => array.indexOf(tile) === index)
	// .length


  console.log('1) eg: ', placeholder('R 4'));
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
