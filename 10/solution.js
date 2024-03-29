const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------

const cycles = op => ({noop: 1, addx: 2}[op]);

const signalStrength40hz = ops => ops
    .split('\n')
    .map(item => item.split(' '))
    .reduce(([clock, x, totalStrength], [op, value = 0]) => {
        const newClock = clock + cycles(op);
        const newX = x + Number(value);
        let strength = 0;

        // check for cycle value and strength
        for (; clock < newClock; clock++) {
            if ((clock - 20) % 40 === 0) {
                strength = x * clock
                // console.log({clock, x, str: strength});
            }
        }

        return [newClock, newX, totalStrength + strength];

    }, [1, 1, 0])[2];


console.log('1) eg: ', signalStrength40hz(eg));
console.log('1) input: ', signalStrength40hz(input));

// Part 2 ---------------------------------------------------------------------
/*
    Ok this is going ot be quite tough, I still don't what is required of me

    1) The X register controls the center position of a "###" sprite.
    eg:

    X = 1       X = 2      X = 3
    |###....|   |.###...|  |..###..|
pos  0123456     0123456    0123456

    2) the crt has its own cycle, every row has 40 pixels, with position 0 to 39
    with 6 rows for a total of 240 pixels

    3) if the crt is drawing a pixel and at that exact moment there should be
    part of the sprite there, it is drawn.

    Ideas:
    a pixel is lit if x is either: pixel index, -1, or +1
    make an array(240), index the cycle count
    make function to split array into rows and print the chars
*/

const drawPixels = ops => {
    const screen = [...Array(240)].map(i => '.');

    ops
    .split('\n')
    .map(item => item.split(' '))
    .reduce(([clock, x], [op, value = 0]) => {
        const newClock = clock + cycles(op);
        const newX = x + Number(value);

        for (; clock < newClock; clock++) {
            const pos = clock -1;

            if (
                pos % 40 === x ||
                pos % 40 === x + 1 ||
                pos % 40 === x - 1
            ) {
                screen[pos] = '#'
            }
        }
        return [newClock, newX];
    }, [1, 1]);

    return screen;
};
const borderTop = '┌────────────────────────────────────────┐';
const borderBottom = '\n└────────────────────────────────────────┘';

const printScreen = screen => screen.reduce(([rows, line], pixel) => {
    const newLine = line.concat(pixel);

    if (newLine.length === 40) return [`${rows}\n│${newLine}│`, ''];
    return [rows, newLine];
}, [borderTop, ''])[0].concat(borderBottom);

console.log('2) eg: ');
console.log(printScreen(drawPixels(eg)));
console.log('2) input: EGLHBLFJ');
console.log(printScreen(drawPixels(input)));

/*
Wrong guesses:

Correct:
    1) 13920
    2) EGLHBLFJ
*/
