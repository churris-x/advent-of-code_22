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

    ok I think I can parse the function
    each monkey has an operation and a test

    [op, test, stack]
     0,  1,    2
    [[]]

    items = [[], [], [], []]
    operations = [()=>{},()=>{},()=>{},()=>{}]
    tests = [()=>{},()=>{},()=>{},()=>{}]


*/

const getItems = state => state
    .split('\n\n')           // separate each monkey
    .map(item => item
        .split('\n')[1]      // get the second line
        .split(':')[1]       // get list of numbers
        .split(',')          // create array
        .map(i => Number(i)) // parse each number
    )

const getOperations = state => state
    .split('\n\n')
    .map(item => item
        .split('\n')[2]      // get the third line
        .split('=')[1]       // get the function
    )
    .map(i => new Function('old', `return ${i}`))

const getTests = state => state
    .split('\n\n')
    .map(item => item
        .split('\n')[3]      // get the fourth line
        .split('by')[1]      // get the divisor
    )                        // test if input is divisible by number
    .map(i => new Function('number', `return number % ${i} === 0`))

// ----------------------------------------------------------------------------

const moveItem = (monkeys, from, to, itemIndex = 0) => monkeys
    .map((monkey, index) => {
        if (index === from) return monkey.filter(i => i !== monkeys[from][itemIndex]);
        if (index === to) return [...monkey, monkeys[from][itemIndex]];
        return monkey;
    });



const items = getItems(eg);
const operations = getOperations(eg);
const tests = getTests(eg);


// console.log('1) eg: ', getItems(eg));
// console.log('1) eg: ', moveItem(getItems(eg), 0, 3));

console.log('1) eg: ', [items, operations.map(i => i.toString()), tests.map(i => i.toString())]);

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
