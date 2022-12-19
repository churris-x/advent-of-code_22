const fs = require('fs');
const elves = fs.readFileSync('./input.txt').toString();

const egInventory = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const countCal = elf => elf.reduce((sum, food) => Number(food) + sum ,0);

const findHighestCalorie = inventory => inventory
	.split('\n\n')
	.map(elf => countCal(elf.split('\n')))
	.reduce((highest, current) => highest > current ? highest : current, 0);

const findTopThreeSum = inventory => inventory
	.split('\n\n')
	.map(elf => countCal(elf.split('\n')))
	.sort((a, b) => b - a)
	.slice(0,3)
	.reduce((sum, next) => sum + next);

 console.log(findHighestCalorie(egInventory));
  console.log(findHighestCalorie(elves));
  console.log(findTopThreeSum(elves));

/*
Wrong guesses:
	12446004

Correct:
	1) 69795
	2) 208437
*/
