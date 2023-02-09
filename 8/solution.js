const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------

/*
	hmm this is going to be difficult
         
	  N   
	W ^ E 
	  S  
         
	Store visibility as a sum of powers of 2, then check values with bitwise operator
	eg: 
		north + west = 9
		9 & north = true
		9 & east = false

	'0000'   0   u ndefined
	'0001'   1   n orth
	'0010'   2   e ast
	'0100'   4   s outh
	'1000'   8   w est

*/

const [north, east, south, west] = [1, 2, 4, 8];

const getRows = grid => grid.split('\n').map(row => row.split(''));
const getColumns = rows => rows
	.map((row, rowIndex, array) => row
		.map((i, index) => array[index][rowIndex])
	);

const checkVisible = (array, heading) => array.reduce(({highest, set}, tree) => {
	const [height, visible] = tree;
	if (highest < height) return { highest: height, set: [...set, [height, visible + heading]]}

	return {highest, set: [...set, tree]}

}, {highest: -1, set: []}).set;

const checkGrid = grid => {
	const rows = getRows(grid).map(i => i.map(i => [i, 0]));

	const checkedRows = rows
		.map(i => checkVisible(i, west))
		.map(i => [...i].reverse())
		.map(i => checkVisible(i, east))
		// .map(i => [...i].reverse())			// only needed if orientation is important

	const checkedColumns = getColumns(checkedRows)
		.map(i => checkVisible(i, north))
		.map(i => [...i].reverse())
		.map(i => checkVisible(i, south))
		// .map(i => [...i].reverse())			// only needed if orientation is important

	return checkedColumns
};


const symbol = [' ', '╵', '╶', '└', '╷', '│', '┌', '├', '╴', '┘', '─', '┴', '┐', '┤', '┬', '┼']
const getHeadings = visible => {
	let styled = '';
	styled += visible & north ?  'N' : ' ';
	styled += visible & east ?  'E' : ' ';
	styled += visible & south ?  'S' : ' ';
	styled += visible & west ?  'W' : ' ';
	return styled;
}

 const showVisibility = grid => getColumns(grid)
 	.map(row => row
 		.map(([height, visible]) => 
 			getHeadings(visible)
 		)
 		.join('│')
	)
	.join('\n────┼────┼────┼────┼────\n')

const getVisible = grid => grid
	.reduce((count, rows) => count + rows
		.reduce((count, [height, visible]) => count + !!visible
		, 0)
	, 0)

// console.log(eg);
// console.log(getColumns(getColumns(getRows(eg))).map(row => row.map(i=> ` ${i} `).join('│')).join('\n───┼───┼───┼───┼───\n'));
// console.log(showVisibility(checkGrid(eg)));
console.log('1) eg: ', getVisible(checkGrid(eg)));
console.log('1) input: ', getVisible(checkGrid(input)));

// Part 2 ---------------------------------------------------------------------

// console.log('2) eg: ', placeholder(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:

Correct:
	1) 1711
	2) 
*/
