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
/*
    Ok, now with the getters, the question is how to implement turns and rounds
    I'll need to get clever with implementing the stacks of items

    for loop until 20 rounds
*/

const loseWorry = item => Math.floor(item / 3);

const moveItem = (monkeys, from, to, itemIndex = 0, item) => monkeys
    .map((monkey, index) => {
        if (index === from) return monkey.filter((item, i) => i !== 0);
        if (index === to) return [...monkey, item ?? monkeys[from][itemIndex]];
        return monkey;
    });

const monkeyThrow = ({items = [], monkeyIndex = 0, round = 0}) => {

    if (round >= 20) return items;

    const monkey = items[monkeyIndex];

    if (monkey.length) {
        // console.log(monkeyIndex, monkey);

        inspections[monkeyIndex]++

        const item = operations[monkeyIndex](monkey[0]);  // apply operation to item

        // console.log(`worry level goes from ${monkey[0]} to ${item}`);
        // console.log(`Monkey gets bored with item. Worry level is divided by 3 to ${loseWorry(item)}`);
        const to = tests[monkeyIndex](loseWorry(item));      // test item with monkey test, return to index
        // console.log(`Item with worry level ${loseWorry(item)} is thrown to monkey ${to}`);


        const newItems = moveItem(items, monkeyIndex, to, 0, loseWorry(item));

        const amountItems = items.reduce((sum, monkey) => sum + monkey.reduce((sum, items) => sum + 1, 0), 0)
        const amountNewItems = newItems.reduce((sum, monkey) => sum + monkey.reduce((sum, items) => sum + 1, 0), 0)

        if (amountItems !== amountNewItems){
            console.log({monkeyIndex, monkey});
            console.log(
                items.reduce((sum, monkey) => sum + monkey.reduce((sum, items) => sum + 1, 0), 0),
                newItems.reduce((sum, monkey) => sum + monkey.reduce((sum, items) => sum + 1, 0), 0)
            );
        }


        return monkeyThrow({
            items: newItems,
            monkeyIndex,
            round,
        });

    }

    // console.log(monkeyIndex, monkey, 'no more items!');
    if (monkeyIndex === items.length -1) console.log(
        round,
        items.map((i, index)=> ({[index]: i.length})),
        items.reduce((sum, monkey) => sum + monkey.reduce((sum, items) => sum + 1, 0), 0)
    );

    return monkeyThrow({
        items: items,
        monkeyIndex: (monkeyIndex + 1) % items.length,
        round: monkeyIndex === items.length -1 ? round + 1 : round,
    });
}

const getMonkeyBusiness = inspections => inspections
    .sort((a, b) => b - a)
    .reduce((product, amount, index) => index < 2 ? product * amount : product)

// TODO(Fran): Make this work in a functional way
// const getInspections = items => {
//     const inspections = items.map(i => 0);
//
//     monkeyThrow({items});
//
//     return inspections;
// }

const items = getItems(input);
const operations = getOperations(input);
const tests = getTests(input);

const inspections = items.map(i => 0);

// console.log('1) eg: ', getItems(input));
// console.log('1) eg: ', getOperations(input).map(i => i.toString()));
// console.log('1) eg: ', getTests(input).map(i => i.toString()));
// console.log('1) eg: ','\n');
console.log('1) eg: ', monkeyThrow({ items }));
console.log('1) eg: ', inspections);
console.log('1) eg: ', getMonkeyBusiness(inspections));


// console.log('1) eg: ', moveItem(getItems(eg), 0, 3));
// console.log('1) eg: ', [
//     items,
//     operations.map(i => i.toString()),
//     tests.map(i => i.toString())
// ]);

// js pass something to last paramenter? log = true?

// console.log('1) input: ', placeholder(input));

// Part 2 ---------------------------------------------------------------------

// const placeholder = () => {};

// console.log('2) eg: ', placeholder(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:
    1) 1819 too low
    1) 6321 too low
Correct:
    1) 
    2) 
*/
