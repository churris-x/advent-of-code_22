const fs = require('fs');
const eg = fs.readFileSync('./eg.txt').toString().slice(0, -1);
const input = fs.readFileSync('./input.txt').toString().slice(0, -1);

/*
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

*/

// const [crates, moves] = input.split('\n\n');
const [crates, moves] = eg.split('\n\n');

const processInput = crates => crates
	.split('\n')
	.map(i=> [...`${i} `]
		.reduce(([output, sum, count], current) => {
			if (count + 1 === 4) return [[...output, sum], '', 0];
			return [output, `${sum}${current}`, count + 1];
		}, [[], '', 0])[0]
	)

	

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