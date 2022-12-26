const fs = require('fs');
const eg = fs.readFileSync('./eg.txt').toString().slice(0, -1);
const input = fs.readFileSync('./input.txt').toString().slice(0, -1);

// const [crates, moves] = input.split('\n\n');
const [crates, moves] = eg.split('\n\n');

const processInput = crates => crates
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

console.log(crates);
console.log(processInput(crates));

// console.log(placeholder(eg));
// console.log(placeholder(input));

// ----------------------------------------------------------------------------

// console.log(placeholder(eg));
// console.log(placeholder(input));

/*
Wrong guesses:

Correct:
	1) 
	2) 
*/