import { Moment } from 'moment';

export interface ParsedData {
	users: ParsedDataUser[],
}

export interface ParsedDataUser {
	id: string,
	entries: ParsedDataEntry[],
}

export interface ParsedDataEntry {
	time: Moment,
	files: string[],
}
