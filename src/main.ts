import { Compiler } from 'webpack';
import { execSync } from 'child_process';
import { memoize } from 'ramda';

import Writer from './mappers/filesystemMapper/writer';
import Reader from './mappers/filesystemMapper/reader';

import DefaultAnalyzer from './timeSpentAnalyzers/defaultTimeSpentAnalyzer';
import { SimpleConsoleReporer } from './reporters/SimpleConsoleReporer';

export enum UsernameStrategy {
	GitEmail = 'gitemail',
	GitName = 'gitname',
	WhoAmI = 'unixuser',
	Test = 'test',
}

export interface PluginDerivedOptions {
	cwd: string,
	userId: string,
}

export interface PluginOptions {
	forceCwd: string,
	directoryName: string,
	usernameStrategy: UsernameStrategy,
	workingThreshold: number
}

let defaultOptions: PluginOptions = {
	forceCwd: undefined,
	directoryName: '.webpacktime',
	usernameStrategy: UsernameStrategy.GitEmail,
	workingThreshold: 15 // in minutes
};

const usernameStrategies = {
	[UsernameStrategy.GitEmail]: 'git config user.email',
	[UsernameStrategy.GitName]: 'git config user.name',
	[UsernameStrategy.WhoAmI]: 'whoami',
	[UsernameStrategy.Test]: () => new Promise((res, rej) => {
		res('test');
	})
};

class TimetrackerPlugin {
	private writer: Writer;
	private reader: Reader;

	constructor(options: PluginOptions) {
		options = Object.assign(options, defaultOptions);

		let cwd: string = options.forceCwd || process.cwd();
		let selectedStrategy:any = usernameStrategies[options.usernameStrategy];
		let userIdPromise:Promise<string>;

		if (typeof selectedStrategy === 'string') {
			userIdPromise = Promise.resolve(execSync(selectedStrategy).toString().trim());
		}
		else if (selectedStrategy instanceof Promise) {
			userIdPromise = (<any>selectedStrategy)() ;
		}

		userIdPromise.then((userId) => {
			let derivedOptions: PluginDerivedOptions = {cwd, userId};

			this.writer = new Writer(options, derivedOptions);
			this.reader = new Reader(options, derivedOptions);
			let rawActivity = this.reader.readActivity();

			let analyzer = new DefaultAnalyzer(options);
			let activity = analyzer.analyzeActivity(rawActivity);

			let reporter = new SimpleConsoleReporer();
			reporter.reportActivity(activity);
		});
	}

	apply(compiler: any) {
		compiler.plugin('watch-run', (watching, done) => {
			// older versions of webpack have the watchFileSystem data on compiler object
			const changedTimes = watching.compiler
				? watching.compiler.watchFileSystem.watcher.mtimes
				: watching.watchFileSystem.watcher.mtimes;

			const changedFiles: string[] = Object
				.keys(changedTimes);

			this.writer.writeActivity(changedFiles);
			done();
		});
	}
}

module.exports = TimetrackerPlugin;
