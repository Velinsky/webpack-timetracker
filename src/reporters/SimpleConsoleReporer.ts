import { IReporter } from './IReporter';
import { ParsedActivity } from '../parsedActivity';
import chalk from 'chalk';
// import pad from 'pad'

export class SimpleConsoleReporer implements IReporter {
	reportActivity(activity: ParsedActivity): void {
		let hours = Math.round(activity.total.time / 60);

		console.log('');
		console.log(chalk.underline('Total time spent on repository:') + ' ' + chalk.green(hours.toString()) + ' ' + chalk.reset('hours'));
		console.log('');
		console.log(chalk.dim('Breakdown by user'));

		activity.byUser.forEach(user => {
			let userHours = Math.round(user.total.time / 60);
			console.log(chalk.reset(user.name + ':') + ' ' + chalk.green(userHours.toString()) + ' ' + chalk.reset('hours'));
		});

		console.log('');
	}
}
