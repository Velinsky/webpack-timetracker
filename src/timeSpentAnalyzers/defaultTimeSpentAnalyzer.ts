import { ITimeSpentAnalyzer } from './ITimeSpentAnalyzer';
import { ParsedData } from '../parsedData';
import { ParsedActivity } from '../parsedActivity';

export default class DefaultTimeSpentAnalyzer implements ITimeSpentAnalyzer {
	analyzeActivity(data: ParsedData): ParsedActivity {
		console.log(data);
		return undefined;
	}

}
