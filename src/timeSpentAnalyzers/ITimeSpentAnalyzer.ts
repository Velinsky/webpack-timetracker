import { ParsedActivity } from '../parsedActivity';
import { ParsedData } from '../parsedData';

export interface ITimeSpentAnalyzer {
	analyzeActivity(data: ParsedData): ParsedActivity
}
