# Advent of code 2022
Solutions to each day, in the following format:

```bash
1					# day
├── eg.txt			# example input
├── input.txt		# actual puzzle input
├── solution.js		# contains the actual solution
└── todo.txt		# puzzle preamble and premise
```

<!-- ### Installing
1. Run `$ npm i` to install `dotenv`.
2. Run `$ npm start`, you will be prompted for your AOC session token so a the fetch can be made

Run the solution with `node 1/solution.js` to print the answers of part 1 and 2 of day 1 -->

### NPM scripts
- fetch prompt to input how many days you want to fetch
- delete prompt to input how many days you want to delete, confirm with <kbd>y</kbd>

## Todo:

- [ ] Transfer scripts to bash scripts (run with `sh`)
- [ ] After first install (`npm start`) create the `.env` file and prompt with the token `prompt | cat > .env`
- [ ] Script that creates the next puzzle folder, fetches `input.txt`, `eg.txt`, `todo.md` and creates `solution.js` template
- [ ] Fetch inputs should look at directories without input and fetch then
- [x] put days in separate folder? nah
- [ ] Maybe only allow dev to fetch and use the token, the already solved solutions should keep the input?


## License

My solutions are released under the [MIT License][opensource].

[opensource]: http://www.opensource.org/licenses/MIT
