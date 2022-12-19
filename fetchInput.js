require('dotenv').config()

const token = process.env.AUTH_TOKEN;
const url = `https://adventofcode.com/2022/day/${day}/input`;

const getDayInput = async day => {
	const response = await fetch(url, {
		'headers': {
			'cookie': `session=${token}`,
		}
	});
	const data = await response.text();
	return data;
};

// getDayInput(1);