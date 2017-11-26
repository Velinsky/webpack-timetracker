import { compiler } from 'webpack';
import {execSync} from "child_process";
import {memoize} from 'ramda';

import Writer from './writer';
import Reader from './reader';

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
}

let defaultOptions:PluginOptions = {
	forceCwd: undefined,
	directoryName: '.webpacktime',
	usernameStrategy: UsernameStrategy.GitEmail,
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
		let derivedOptions: PluginDerivedOptions = { cwd, userId };

		this.writer = new Writer(options, derivedOptions);
		this.reader = new Reader(options, derivedOptions);
	}

	apply(compiler: compiler.Compiler) {
		compiler.plugin('done', () => {
			this.writer.writeActivity();
			console.log(this.writer);
		});
	}
}

module.exports = TimetrackerPlugin;
