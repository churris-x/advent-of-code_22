const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*
ok how in the fuck am I even going to do this?

Maybe a reduce that stores the current repository, 
returning a [{'path': value}] dictionary

Another way would be to couple the commands with their output

$ cd /
$ ls
dir a 				/
14848514 b.txt 		/
8504156 c.dat 		/
dir d 				/
$ cd a
$ ls
dir e 				/a
29116 f 			/a
2557 g 				/a
62596 h.lst 		/a
$ cd e
$ ls
584 i 				/a/e
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j 			/d
8033020 d.log 		/d
5626152 d.ext 		/d
7214296 k 			/d

{
	path: '/',
	tree: [{
		'/a' : 0,
		'/b.txt': 14848514,
		'/c.dat': 8504156
	}],
}

	cd .. => '/a/e'.slice(0, '/a/e'.lastIndexOf('/'))
	cd f => '/a/e' => `${/a/e}/${f}`
	cd / => '/'

*/

const placeholder = commands => commands.split('\n').reduce((dir, command) => {
	const {path, tree} = dir;
	const args = command.split(' ');

	if (command.includes('$ ls')) return dir;
	
	// if '$ cd' change path
	if (command.includes('$ cd ')) {
		if (args[2] === '/') return {path: '', tree}
		if (args[2] === '..') return {path: path.slice(0, path.lastIndexOf('/')), tree}
		return {path: `${path}/${args[2]}`, tree}
	}
	// if file add to tree
	return {path, tree: {...tree, [`${path}/${args[1]}`]: Number(args[0]) || 0}}

}, {path: '', tree: {'/': 0}}).tree;

console.log('1) eg: ', placeholder(eg));
// console.log('1) input: ', placeholder(input));

// Part 2 ---------------------------------------------------------------------

// console.log('2) eg: ', placeholder(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:

Correct:
	1) 
	2) 
*/
