const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------

/*
	hmm this is going to be difficult
	N
   W E
	S

	each direction will be a boolean, n: true means it is visible from the north nah

	'0000'
	'0001' n
	'0010' e
	'0100' s
	'1000' w	

*/

const getRows = grid => grid.split('\n').map(row => row.split(''));
const getColumns = grid => getRows(grid)
	.map((row, rowIndex, array) => row
		.map((i, index) => array[index][rowIndex])
	);

const placeholder = grid => {

	return {
		rows: getRows(grid),
		columns: getColumns(grid),
	}
};

console.log(eg);
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
