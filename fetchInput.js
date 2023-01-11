require('dotenv').config()
const fs = require('fs');

const { AUTH_TOKEN } = process.env;

// TODO(Fran): check if no day use Date.getDate();
// TODO(Fran): add year param? new Date('1/1/21').getFullYear() to allow 2 digit

const getInputByDay = async (day) => {
	if (!AUTH_TOKEN) throw 'Function getInputByDay is missing AUTH_TOKEN';
	if (!day || isNaN(day)) throw `Function getInputByDay needs a day number, got instead: ${day}`;
	if (day < 1 || day > 25) throw `Function getInputByDay: invalid day, needs to be between 1-25, got instead: ${day}`;

	const url = `https://adventofcode.com/2022/day/${day}/input`;
	const response = await fetch(url, {
		'headers': {
			'cookie': `session=${AUTH_TOKEN}`,
		}
	});
	const data = await response.text();
	return data;
};


// Fetches and saves input to a file when this file is called
const day = process.argv[2];

if (day) {
	(async () => {
		const input = await getInputByDay(day);
		
		// TODO(Fran): check if folder already exists, if not create it
		await fs.writeFile(`${day}/input.txt`, input, error => { 
			if (error) throw error;
			console.log(`Input for day ${day} wrote successfuly.`);
		});
	})();
}

module.exports = {
	getInputByDay,
};
