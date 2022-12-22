const fs = require('fs');
const eg = fs.readFileSync('./eg.txt').toString().slice(0, -1);
const input = fs.readFileSync('./input.txt').toString().slice(0, -1);

const priority = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const findCommonItem = (a, b) => [...a]
	.reduce((common, current) => b.includes(current) ? current : common);

const findHighestPriority = sacks => sacks
	.split('\n')
	.map( sack => {
		const part = sack.length / 2;
		const commonItem = findCommonItem(sack.slice(part), sack.slice(0, part));
		return priority.indexOf(commonItem);
	})
	.reduce((sum, item) => sum + item, 0);


console.log(findHighestPriority(eg));
console.log(findHighestPriority(input));

/*
Wrong guesses:
	

Correct:
	1) 7848
*/
