const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*
ok how in the fuck am I even going to do this?

Maybe a reduce that stores the current repository, 
returning a [{'path': value}] dictionary

$ cd /
$ ls
dir a 				/
14848514 b.txt 		/
8504156 c.dat 		/
dir d 				/
$ cd a
$ ls
dir e 				/a/
29116 f 			/a/
2557 g 				/a/
62596 h.lst 		/a/
$ cd e
$ ls
584 i 				/a/e/
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j 			/d/
8033020 d.log 		/d/
5626152 d.ext 		/d/
7214296 k 			/d/
*/

// console.log('1) eg: ', placeholder(eg));
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
