import { compiler } from 'webpack';
import { execSync } from 'child_process';
import { memoize } from 'ramda';

import Writer from './mappers/filesystemMapper/writer';
import Reader from './mappers/filesystemMapper/reader';

import DefaultAnalyzer from './timeSpentAnalyzers/defaultTimeSpentAnalyzer';

enum UsernameStrategy {
	GitEmail = 'gitemail',
	GitName = 'gitname',
	WhoAmI = 'unixuser',
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
	workingThreshold: 15
};

const commandMap = {
	[UsernameStrategy.GitEmail]: 'git config user.email',
	[UsernameStrategy.GitName]: 'git config user.name',
	[UsernameStrategy.WhoAmI]: 'whoami'
};

class TimetrackerPlugin {
	private writer: Writer;
	private reader: Reader;

	constructor(options: PluginOptions) {
		options = Object.assign(options, defaultOptions);

		let cwd: string = options.forceCwd || process.cwd();
		let userId = execSync(commandMap[options.usernameStrategy]).toString().trim();
		let derivedOptions: PluginDerivedOptions = {cwd, userId};

		this.writer = new Writer(options, derivedOptions);
		this.reader = new Reader(options, derivedOptions);
		let rawActivity = this.reader.readActivity();

		let analyzer = new DefaultAnalyzer;
		let activity = analyzer.analyzeActivity(rawActivity)

	}

	apply(compiler: compiler.Compiler) {
		compiler.plugin('watch-run', (watching, done) => {
			const changedTimes = watching.compiler.watchFileSystem.watcher.mtimes;
			const changedFiles:string[] = Object
				.keys(changedTimes);

			this.writer.writeActivity(changedFiles);
			done();
		});
	}
}

module.exports = TimetrackerPlugin;
