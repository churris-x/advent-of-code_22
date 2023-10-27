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
    .split('\n\n')                   // separate each monkey
    .map(item => item
        .split('\n')[1]              // get the second line
        .split(':')[1]               // get list of numbers
        .split(',')                  // create array
        .map(i => Number(i))         // parse each number
    )

const getOperations = state => state
    .split('\n\n')
    .map(item => item
        .split('\n')[2]              // get the third line
        .split('=')[1]               // get the function
    )
    .map(i => new Function('old', `return ${i}`))

const getTests = state => state
    .split('\n\n')
    .map(item => ([
        item                         // divisor
            .split('\n')[3]
            .split('by')[1],
        item                         // if true monkey
            .split('\n')[4]
            .split('monkey')[1],
        item                         // if false monkey
            .split('\n')[5]
            .split('monkey')[1],
        ])
    )
    .map(i => new Function(          // if input is divisible, pass to monkey
        'number',
        `return number % ${i[0]} === 0 ? ${i[1]} : ${i[2]}`
    ));

// ----------------------------------------------------------------------------
/*
    Ok, now with the getters, the question is how to implement turns and rounds
    I'll need to get clever with implementing the stacks of items

    for loop until 20 rounds
*/

const loseWorry = item => Math.floor(item / 3);

const moveItem = (monkeys, from, to, itemIndex = 0, item) => monkeys
    .map((monkey, index) => {
        if (index === from) return monkey.filter(i => i !== monkeys[from][itemIndex]);
        if (index === to) return [...monkey, item ?? monkeys[from][itemIndex]];
        return monkey;
    });

const monkeyThrow = ({items = [], monkeyIndex = 0, round = 0}) => {

    if (round >= 20) return items;

    const monkey = items[monkeyIndex];

    if (monkey.length) {
        console.log(monkeyIndex, monkey, 'still have items!');

        const to = tests[monkeyIndex](monkey[0]);      // test item with monkey test, return to index

        const item = operations[monkeyIndex](monkey[0]);  // apply operation to item

        const newItems = moveItem(items, monkeyIndex, to, 0, loseWorry(item));

        return monkeyThrow({
            items: newItems,
            monkeyIndex,
            round: monkeyIndex === items.length -1 ? round + 1 : round,
        });

    }

    console.log(monkeyIndex, monkey, 'no more items!');

    return monkeyThrow({
        items: items,
        monkeyIndex: (monkeyIndex + 1) % items.length,
        round: monkeyIndex === items.length -1 ? round + 1 : round,
    });
}

const items = getItems(eg);
const operations = getOperations(eg);
const tests = getTests(eg);


console.log('1) eg: ', getItems(eg));
console.log('1) eg: ', monkeyThrow({ items }));
// console.log('1) eg: ', moveItem(getItems(eg), 0, 3));
// console.log('1) eg: ', [
//     items,
//     operations.map(i => i.toString()),
//     tests.map(i => i.toString())
// ]);

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
