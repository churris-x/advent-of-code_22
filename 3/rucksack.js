const fs = require('fs');
const eg = fs.readFileSync('./eg.txt').toString().slice(0, -1);
const input = fs.readFileSync('./input.txt').toString().slice(0, -1);

const priority = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const findCommonItems = (a, b) => [...a]
	.reduce((common, current) => b.includes(current) ? [...common, current] : common, []);

const findTotalPriority = sacks => sacks
	.split('\n')
	.map( sack => {
		const part = sack.length / 2;
		const commonItem = findCommonItems(sack.slice(part), sack.slice(0, part))[0];
		return priority.indexOf(commonItem);
	})
	.reduce((sum, item) => sum + item, 0);


console.log(findTotalPriority(eg));
console.log(findTotalPriority(input));

// ----------------------------------------------------------------------------

const findBadge = (a, b, c) => findCommonItems(
	findCommonItems(a, b).join(''),
	findCommonItems(b, c).join('')
)[0];

const findTotalBadgePriority = groups => groups
	.split('\n')
	.reduce((sum, sack) => {
		const [total, group] = sum;
		
		if (group.length === 2) {
			
			const groupPriority = priority.indexOf(findBadge(...group, sack));
			return [total + groupPriority, []];
		}

		return [total, [...group, sack]]
	}, [0, []]);

console.log(findTotalBadgePriority(eg)[0]);
console.log(findTotalBadgePriority(input)[0]);
/*
Wrong guesses:
	
Correct:
	1) 7848
	2) 2616
*/
