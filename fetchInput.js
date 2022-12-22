require('dotenv').config()
const fs = require('fs');

const { AUTH_TOKEN } = process.env;

// TODO(Fran): check if no day use Date.getDate();

const getInputByDay = async day => {
	if (!day) throw `Function getInputByDay needs a day, got instead: ${day}`;
	if (day < 0) throw 'Function getInputByDay: day needs to be a positive number';

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
const inputDays = process.argv.slice(2);

if (inputDays.length) {
	inputDays.forEach(async day => {
		const input = await getInputByDay(day);

		// TODO(Fran): check if folder already exists, if not create it
		await fs.writeFile(`${day}/input.txt`, input, error => { 
			if (error) throw error;
			console.log(`Input for day ${day} wrote successfuly.`);
		});
	})
}

module.exports = {
	getInputByDay,
};
