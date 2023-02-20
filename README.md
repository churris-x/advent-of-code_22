# Advent of code 2022
Solutions to each day, in the following format:

```bash
1                   # day
├── eg.txt          # example input
├── input.txt       # actual puzzle input
├── solution.js     # contains the puzzle solution
└── todo.txt        # puzzle preamble and premise
```

### Installing
1. Run `$ npm i` to install `dotenv`.
<!-- 2. Run `$ npm start`, you will be prompted for your AOC session token so a the fetch can be made -->

Run each solution with `$ node 1/solution.js` to print the answers of part 1 and 2 of day 1

### NPM scripts
- `fetch` prompt to input how many days you want to fetch
- `delete` prompt to input how many days you want to delete, confirm with <kbd>y</kbd>

## Todo:

- [x] Transfer scripts to bash scripts (run with `sh`)
- [x] Fetch and delete need to check if there is an `$1` input before prompting user
- [x] put days in separate folder? nah
- [x] Maybe only allow dev to fetch and use the token, the already solved solutions should keep the input? No, in theory each input is user based
- [x] Make the fs.readFile api work from different working directories -> require.resolve('path/')
- [x] Get help in refactoring bash scripts
- [x] After first install (`$ npm start`) creates the `.env` file and prompt with the token `prompt | cat > .env`
- [ ] Script that creates the next puzzle folder, fetches `input.txt`, `eg.txt`, `todo.md` and creates `solution.js` template
- [ ] Add flag to fetch command that loops through existing day folders

## License

My solutions are released under the [MIT License][mit].
Puzzles and inputs belong to [Advent of Code][aoc]

[mit]: http://www.opensource.org/licenses/MIT
[aoc]: https://adventofcode.com/2022/about#legal
