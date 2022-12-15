const elves = require('./input.json');
const totalInventory = JSON.parse(JSON.stringify(elves.totalInventory));

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
	.split('\r\n\r\n')
	.map(elf => countCal(elf.split('\r\n')))
	.reduce((highest, current) => highest > current ? highest : current, 0);


 console.log(findHighestCalorie(totalInventory));



/* Part 1
Wrong guesses:
	12446004

Correct:
	69795
*/
