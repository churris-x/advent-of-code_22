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

    jesus if this is part one I'm scared for part 2
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
    .map(i => new Function('old', `return ${i.trim()}`))

const getTests = state => state
    .split('\n\n')
    .map(item => ([
        item                         // divisor
            .split('\n')[3]
            .split('by')[1]
            .trim(),
        item                         // if true monkey
            .split('\n')[4]
            .split('monkey')[1]
            .trim(),
        item                         // if false monkey
            .split('\n')[5]
            .split('monkey')[1]
            .trim(),
        ])
    )
    .map(i => new Function(          // if input is divisible, pass to monkey
        'number',
        `return number % ${i[0]} === 0 ? ${i[1]} : ${i[2]}`
    ));

// ----------------------------------------------------------------------------

const loseWorry = item => Math.floor(item / 3);

const moveItem = (monkeys, from, to, itemIndex = 0, item) => monkeys
    .map((monkey, index) => {
        if (index === from) return monkey.filter((item, i) => i !== 0); // has to be first item
        if (index === to) return [...monkey, item ?? monkeys[from][itemIndex]];
        return monkey;
    });

const monkeyThrow = ({
    items = [],
    monkeyIndex = 0,
    round = 0,
    operations = [],
    tests = [],
    inspections = []
}) => {

    if (round >= 20) return { items, inspections };

    const monkey = items[monkeyIndex];

    if (monkey.length) {
        const newInspections = inspections.map(           // count inspection
            (m, i) => i === monkeyIndex ? m + 1: m
        )

        const item = operations[monkeyIndex](monkey[0]);  // apply operation to item

        const to = tests[monkeyIndex](loseWorry(item));   // test item with monkey test, return to index

        const newItems = moveItem(items, monkeyIndex, to, 0, loseWorry(item));

        return monkeyThrow({
            items: newItems,
            monkeyIndex,
            round,
            operations,
            tests,
            inspections: newInspections,
        });
    }

    return monkeyThrow({
        items,
        monkeyIndex: (monkeyIndex + 1) % items.length,
        round: monkeyIndex === items.length -1 ? round + 1 : round,
        operations,
        tests,
        inspections,
    });
}

const getMonkeyBusiness = inspections => inspections
    .sort((a, b) => b - a)
    .reduce((product, amount, index) => index < 2 ? product * amount : product)

const getArgs = (input) => ({
    items: getItems(input),
    operations: getOperations(input),
    tests: getTests(input),
    inspections: getItems(input).map(i => 0)
});

console.log('1) eg: ', monkeyThrow( getArgs(eg) ));
console.log('1) eg: ', getMonkeyBusiness( monkeyThrow( getArgs(eg) )?.inspections ));

console.log('1) input: ', monkeyThrow( getArgs(input) ));
console.log('1) input: ', getMonkeyBusiness(monkeyThrow( getArgs(input) )?.inspections ));

// eg:     10605
// input: 110888

// Part 2 ---------------------------------------------------------------------

// const placeholder = () => {};

// console.log('2) eg: ', placeholder(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:
    1) 1819 too low
    1) 6321 too low
Correct:
    1) 110888
    2) 
*/
