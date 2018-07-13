import { ParsedData } from './parsedData';
import moment = require('moment');

export interface ParsedActivity {
	byUser: ParsedActivityUser[],
	byFile: ParsedActivityFile[],
	total: ParsedActivityTotal,
	rawData: ParsedData,
}

export interface ParsedActivityUser {
	name: string,
	total: ParsedActivityTotal,
}

export interface ParsedActivityTotal {
	time: number
}

export interface ParsedActivityFile {
	path: string,
	total: ParsedActivityTotal
}

// sample
let x:ParsedActivity = {
	byUser: [
		{
			name : 'test',
			total: {
				time: 123
			}
		}
	],
	byFile: [
		{
			path: '/test/js.js',
			total: {
				time: 123
			}
		}
	],
	total: {
		time: 123
	},
	rawData: {
		users: [{
			id: 'test',
			entries: [{
				files: ['a', 'b'],
				time: moment()
			}]
		}],
	}
};
