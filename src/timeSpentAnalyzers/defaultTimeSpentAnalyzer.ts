import { ITimeSpentAnalyzer } from './ITimeSpentAnalyzer';
import { ParsedData } from '../parsedData';
import { ParsedActivity, ParsedActivityUser } from '../parsedActivity';
import { PluginOptions } from '../main';

export default class DefaultTimeSpentAnalyzer implements ITimeSpentAnalyzer {
	options:PluginOptions;

	constructor(cfg: PluginOptions) {
		this.options = cfg;
	}
	analyzeActivity(data: ParsedData): ParsedActivity {
		let total = 0;
		let usersActivity:ParsedActivityUser[] = [];

		data.users.forEach(user => {
			let userTotal = 0;

			for (let i = 0; i < user.entries.length; i++) {
				const entry = user.entries[i].time;
				const prevEntry = user.entries[i - 1] ? user.entries[i - 1].time : null;

				if (!prevEntry) continue;

				const timeDiff = entry.diff(prevEntry, 'minutes');

				if (timeDiff > this.options.workingThreshold) continue;

				userTotal += timeDiff;
			}

			usersActivity.push({
				name: user.id,
				total: {
					time: userTotal
				}
			});

			total += userTotal
		});

		return {
			rawData: data,
			total: {
				time: total
			},
			byUser: usersActivity,
			byFile: [],
		};

		return undefined;
	}
}
