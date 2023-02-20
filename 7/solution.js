const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*
ok how in the fuck am I even going to do this?

Maybe a reduce that stores the current repository, 
returning a [{'path': value}] dictionary

Another way would be to couple the commands with their output

	cd .. => '/a/e'.slice(0, '/a/e'.lastIndexOf('/'))
	cd f => '/a/e' => `${/a/e}/${f}`
	cd / => '/'

Answer was both!
*/

const getTree = commands => commands
	.split('\n')
	.reduce(({ path, tree }, command) => {
		const args = command.split(' ');
		
		// if command cd, change path, else skip
		if (command.includes('$ cd ')) {
			if (args[2] === '/') return {path: '', tree}
			if (args[2] === '..') return {path: path.slice(0, path.lastIndexOf('/')), tree}
			return {path: `${path}/${args[2]}`, tree}
		}
		if (command.includes('$ ')) return { path, tree };

		// if file add to tree
		return {path, tree: [ ...tree, [`${path}/${args[1]}`, (Number(args[0]) || 0) ] ]}

	}, {path: '', tree: [['/', 0]]}).tree;

const getFolderSizes = tree => tree
	.filter(([path, size]) => size === 0)
	.sort()
	.map(([folderPath]) => ([folderPath, tree
		.filter(([path, size]) => path.includes(folderPath))
		.reduce((sum, [path, size]) => sum + size, 0)
	]))

const getSizeBelowLimit = (folders, limit = 100000) => folders
	.filter(([path, size]) => size <= limit)
	.reduce((sum, [path, size]) => sum + size, 0)	

console.log(getTree(eg), '\n\n', getFolderSizes(getTree(eg)), '\n\n');

console.log('1) eg: ', getSizeBelowLimit(getFolderSizes(getTree(eg))));
console.log('1) input: ', getSizeBelowLimit(getFolderSizes(getTree(input))));

// Part 2 ---------------------------------------------------------------------

const getSizeAboveLimit = (folders, update = 30000000) => folders
	.filter(([path, size]) => 70000000 - folders[0][1] + size >= update)
	.sort(([a, sizeA], [b, sizeB]) => sizeA - sizeB)
	[0][1]

console.log('2) eg: ', getSizeAboveLimit(getFolderSizes(getTree(eg))));
console.log('2) input: ', getSizeAboveLimit(getFolderSizes(getTree(input))));

/*
Wrong guesses:

Correct:
	1) 1118405
	2) 12545514
*/
