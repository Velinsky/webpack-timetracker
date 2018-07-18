import { ParsedActivity } from '../parsedActivity';

export interface IReporter {
	reportActivity(activity: ParsedActivity): void
}
