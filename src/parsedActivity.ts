export interface ParsedActivity {
	byUser: ParsedActivityUser[],
	byFile: ParsedActivityFile[],
	total: ParsedActivityTotal,
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
	}
};
