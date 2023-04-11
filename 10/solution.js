const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*
    clock with cycles
    X register initial X = 1
    addx V (2 cycles) => X + V
    noop (1 cycle) => {}
    signal strength = cycle * X
    {20, 60, 100, 140, 180, 220} [......] 20 + 40

    noop      1
    addx 3    2
    addx -5   2

X    11144
c    12345
    [-----]
*/

const smallEg = `noop
addx 3
addx -5`;

const cycles = op => ({noop: 1, addx: 2}[op]);

const placeholder = ops => ops
    .split('\n')
    .map(item => item.split(' '))
    .reduce(([clock, x, totalStrength], [op, value = 0]) => {
        if (isNaN(value)) throw 'value is nan';

        const newClock = clock + cycles(op);
        const newX = x + Number(value);
        let strength = 0;


        // check for cycle value and strength
        for (; clock < newClock; clock++) {
            if ((clock - 20) % 40 === 0) {
                console.log(clock, x, x * clock);
                strength = x * clock
            }
        }

        return [newClock, newX, totalStrength + strength];

    }, [1, 1, 0]);


// console.log('1) eg: ', placeholder(smallEg));
console.log('1) eg: ', placeholder(eg));
console.log('1) input: ', placeholder(input));

// Part 2 ---------------------------------------------------------------------

// console.log('2) eg: ', placeholder(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:

Correct:
    1) 13920
    2) 
*/
