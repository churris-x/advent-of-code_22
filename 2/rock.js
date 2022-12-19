const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const eg = `A Y
B X
C Z
`;

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
	.slice(0, -1)
	.reduce((sum, round) => sum + scoreRound(...round.split(' ')), 0)

console.log(sumScores(eg));
console.log(sumScores(input));


/*
Wrong guesses:
	14499

Correct:
	1) 10941
*/
