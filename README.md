# Advent of code 2022
Solutions to each day, in the following format:

```bash
1                   # day
├── eg.txt          # example input
├── input.txt       # actual puzzle input
├── solution.js     # contains the puzzle solution
└── todo.txt        # puzzle preamble and premise
```

## Use
1. Run `$ npm i` to install `dotenv`.

2. Run `$ npm start`, you will be prompted for your AoC session token (cookie) to fetch your puzzle inputs. You can also manually write it to the `.env` file with the key `AUTH_TOKEN=2343223432...`

3. Run `$ npm run fetch <days>` to fetch the desired days, you can fetch many days at once with brace expansion, eg: `$ npm run fetch {1..5}` will translate to `$ npm run fetch 1 2 3 4 5`
4. Run puzzles with `$ node <day>/solution.js` if the coresponding folder existis

## NPM scripts
- `$ npm run fetch <days>` or input which days you want to fetch
- `$ npm run delete <days>` or input which days you want to delete, confirm with <kbd>y</kbd>

## Todo:

- [x] Transfer scripts to bash scripts (run with `sh`)
- [x] Fetch and delete need to check if there is an `$1` input before prompting user
- [x] put days in separate folder? nah
- [x] Maybe only allow dev to fetch and use the token, the already solved solutions should keep the input? No, in theory each input is user based
- [x] Make the fs.readFile api work from different working directories -> require.resolve('path/')
- [x] Get help in refactoring bash scripts
- [x] After first install (`$ npm start`) creates the `.env` file and prompt with the token `prompt | cat > .env`
- [x] Create `util/` folder, move `template.js` and `fetchInput.js` to it
- [ ] Script that creates the next puzzle folder, fetches `input.txt`, `eg.txt`, `todo.md` and creates `solution.js` template
- [ ] Catch auth error from fetchInput when the cookie is outdated
- [ ] Add flag to fetch command that loops through existing day folders
- [ ] Create util that given a `async path => fs.readFile(require.resolve(path))` something like that with try catch
- [ ] Fix bash semicolon usage, either ; or no

## License

My solutions are released under the [MIT License][mit].
Puzzles and inputs belong to [Advent of Code][aoc]

[mit]: http://www.opensource.org/licenses/MIT
[aoc]: https://adventofcode.com/2022/about#legal
