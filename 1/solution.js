const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString();
const input = fs.readFileSync(require.resolve('./input.txt')).toString();

// Part 1 ---------------------------------------------------------------------

const countCal = elf => elf.reduce((sum, food) => Number(food) + sum ,0);

const findHighestCalorie = inventory => inventory
    .split('\n\n')
    .map(elf => countCal(elf.split('\n')))
    .reduce((highest, current) => highest > current ? highest : current, 0);

// Part 2 ---------------------------------------------------------------------

const findTopThreeSum = inventory => inventory
    .split('\n\n')
    .map(elf => countCal(elf.split('\n')))
    .sort((a, b) => b - a)
    .slice(0,3)
    .reduce((sum, next) => sum + next);

console.log('1) eg: ', findHighestCalorie(eg));
console.log('1) input: ', findHighestCalorie(input));
console.log('2) input: ', findTopThreeSum(input));

/*
Wrong guesses:
    12446004

Correct:
    1) 69795
    2) 208437
*/
