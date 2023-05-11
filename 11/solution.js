const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*
    A lot of string parsing this time
    startingItems -> will be inspect in the order as well
    new Function( 'string' ).call(args, of, func);


    new Function(`(new, old) => ${line 2}`)
    new Function('new', 'old', 'body')

*/

const getItems = state => state
    .split('\n\n')
    .map(item => item
        .split('\n')[1]
        .split(':')[1]
        .split(',')
        .map( i => Number(i))
    )


const moveItem = (monkeys, from, to, itemIndex = 0) => monkeys
    .map((monkey, index) => {
        if (index === from) return monkey.filter(i => i !== monkeys[from][itemIndex]);
        if (index === to) return [...monkey, monkeys[from][itemIndex]];
        return monkey;
    });


console.log('1) eg: ', getItems(eg));
console.log('1) eg: ', moveItem(getItems(eg), 0, 3));
// console.log('1) input: ', placeholder(input));

// Part 2 ---------------------------------------------------------------------

// const placeholder = () => {};

// console.log('2) eg: ', placeholder(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:

Correct:
    1) 
    2) 
*/
