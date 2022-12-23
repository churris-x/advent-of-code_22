const fs = require('fs');
const eg = fs.readFileSync('./eg.txt').toString().slice(0, -1);
const input = fs.readFileSync('./input.txt').toString().slice(0, -1);

// const [crates, moves] = input.split('\n\n');
const [crates, moves] = eg.split('\n\n');

console.log(crates);

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