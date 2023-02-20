const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------

const symbolValue = {
	A: 1,
	B: 2,
	C: 3,
	X: 1,
	Y: 2,
	Z: 3,
};

const minusScore = {
	'2': 0,
	'1': 6,
	'0': 3,
	'-1': 0,
	'-2': 6,
};

const scoreRound = (e, p) => minusScore[symbolValue[p] - symbolValue[e]] + symbolValue[p];

const sumScores = rounds => rounds
	.split('\n')
	.reduce((sum, round) => sum + scoreRound(...round.split(' ')), 0)

console.log('1) eg: ', sumScores(eg));
console.log('1) input: ', sumScores(input));

// Part 2 ---------------------------------------------------------------------

const resultToScore = {
	X: 0,
	Y: 3,
	Z: 6,
};

const scoreRound2 = (e, p) => {
	const target = resultToScore[p];
	let symbol = 0;

	if (minusScore[ 1 - symbolValue[e]] === target) symbol = 1
	if (minusScore[ 2 - symbolValue[e]] === target) symbol = 2
	if (minusScore[ 3 - symbolValue[e]] === target) symbol = 3

	return target + symbol;
};

const sumScores2 = rounds => rounds
	.split('\n')
	.reduce((sum, round) => sum + scoreRound2(...round.split(' ')), 0)

console.log('2) eg: ', sumScores2(eg));
console.log('2) input: ', sumScores2(input));

/*
Wrong guesses:
	14499

Correct:
	1) 10941
	2) 13071
*/
