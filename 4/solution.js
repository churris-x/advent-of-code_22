const fs = require('fs');
const eg = fs.readFileSync('./eg.txt').toString().slice(0, -1);
const input = fs.readFileSync('./input.txt').toString().slice(0, -1);

const bContainsA = ([lowerA, upperA], [lowerB, upperB]) => (lowerA >= lowerB && upperA <= upperB);

const totalContains = pairs => pairs
	.split('\n')
	.map(pair => pair.split(',')
		.map(range => range.split('-')
			.map(i => Number(i))))
	.reduce((sum, [a, b]) => bContainsA(a, b) || bContainsA(b, a) ? sum + 1 : sum, 0);

console.log(totalContains(eg));
console.log(totalContains(input));

/*
Wrong guesses:
	663 too high
	660 too high
	330 too low
	427
	// fucking stupid javascript type coersion fuck off you duck type cunt

Correct:
	1) 651
	2) 
*/