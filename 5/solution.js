 const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);


// Part 1 ---------------------------------------------------------------------

const getColumns = crates => crates
    .split('\n')
    .map(i=> [...`${i} `]
        .reduce(([row, crate, count], current) => {
            if (count + 1 === 4) return [[...row, crate], '', 0];
            return [row, `${crate}${current}`, count + 1];
        }, [[], '', 0])[0])
    
    .reduce((columns, item, index, array) => array[0][index]
        ? [...columns, array.map(row => row[index]).reverse()] 
        : columns
    , [])
    .map(column => column.filter( crate => !!crate.trim()))

const moveCrates = (columns, amount, from, to) => {
    for (let i = 0; i < amount; i++) {  
        const crate = columns[from -1].pop()
        columns[to -1].push(crate);
    }
};

const organizeCrates = (columns, moveset) => {
    const array = JSON.parse(JSON.stringify(columns));

    moveset
        .split('\n')
        .forEach(item => {
            const move = item.split(' ');
            const [amount, from, to] = [move[1], move[3], move[5]];
            moveCrates(array, amount, from, to);
        });

    return array;
};

const getTopCrates = columns => columns.reduce((sum, column) => sum + column.slice(-1)[0][1], '');

const [egCrates, egMoves] = eg.split('\n\n');
const [crates, moves] = input.split('\n\n');

console.log('1) eg: ', getTopCrates(organizeCrates(getColumns(egCrates), egMoves)));
console.log('1) input: ', getTopCrates(organizeCrates(getColumns(crates), moves)));

// Part 2 ---------------------------------------------------------------------

const bulkMoveCrates = (columns, amount, from, to) => {
    const crates = columns[from -1].splice(columns[from -1].length - amount, amount)
    columns[to -1].push(...crates);
};

const bulkOrganizeCrates = (columns, moveset) => {
    const array = JSON.parse(JSON.stringify(columns));

    moveset
        .split('\n')
        .forEach(item => {
            const move = item.split(' ');
            const [amount, from, to] = [move[1], move[3], move[5]];
            bulkMoveCrates(array, amount, from, to);
        });

    return array;
};

console.log('2) eg: ', getTopCrates(bulkOrganizeCrates(getColumns(egCrates), egMoves)));
console.log('2) input: ', getTopCrates(bulkOrganizeCrates(getColumns(crates), moves)));

/*
Wrong guesses:

Correct:
    1) CNSZFDVLJ
    2) QNDWLMGNS
*/
