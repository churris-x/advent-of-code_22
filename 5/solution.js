const fs = require('fs');
const eg = fs.readFileSync('./eg.txt').toString().slice(0, -1);
const input = fs.readFileSync('./input.txt').toString().slice(0, -1);

const getColumns = crates => crates
	.split('\n')
	.map(i=> [...`${i} `]
		.reduce(([row, crate, count], current) => {
			if (count + 1 === 4) return [[...row, crate], '', 0];
			return [row, `${crate}${current}`, count + 1];
		}, [[], '', 0])[0])
	
	.reduce((columns, item, index, array) => array[0][index]
		? [...columns, array.map(row => row[index]).reverse()] 
		: columns
	, [])
	.map(column => column.filter( crate => !!crate.trim()))

const moveCrates = (columns, ammount, from, to) => {
	for (let i = 0; i < ammount; i++) {	
		const crate = columns[from -1].pop()
		columns[to -1].push(crate);
	}
};

const organizeCrates = (columns, moveset) => {
	const array = JSON.parse(JSON.stringify(columns));

	moveset
		.split('\n')
		.forEach(item => {
			const move = item.split(' ');
			const [ammount, from, to] = [move[1], move[3], move[5]];
			moveCrates(array, ammount, from, to);
		});

	return array;
};

const getTopCrates = columns => columns.reduce((sum, column) => sum + column.slice(-1)[0][1], '');

const [crates, moves] = input.split('\n\n');
// const [crates, moves] = eg.split('\n\n');

console.log(getTopCrates(organizeCrates(getColumns(crates), moves)));

// ----------------------------------------------------------------------------

// console.log(placeholder(eg));
// console.log(placeholder(input));

/*
Wrong guesses:

Correct:
	1) 
	2) 
*/