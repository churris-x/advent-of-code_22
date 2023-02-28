const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*
	This is way more complex than I thought...

	save position as []

	== RRRR ==
	......
	......
	......  
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

*/

const opposite = {U: 'D', R: 'L', D: 'U', L: 'R'};

const placeholder = moves => moves
	.split('\n')
	.map(item => item[0].repeat(item[2]))
	.join('').split('')
	.reduce(([distance, prevMove, tiles], move) => {

		let [x, y] = prevMove
			// .slice(-1)[0]
			.split(';')
			.map(i => i | 0);               // parse int

		switch (move) {
			case 'U': y++; break;
			case 'R': x++; break;
			case 'D': y--; break;
			case 'L': x--; break;
		}

		const position = `${x};${y}`

		if (distance && position.includes(prevMove)) return [1, position, tiles + 1]
        if (distance && move == opposite[move]) return [0, position, tiles + 1]

		return [1, position, [tiles];
	}, [0, '0;0', ['0;0']])
	// .filter((tile, index, array) => array.indexOf(tile) === index)
	// .length

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
