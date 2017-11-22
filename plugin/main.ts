import { compiler } from 'webpack';
import Writer from './writer';
import Reader from './reader';

export interface pluginOptions {
	forceCwd: string,
}

export interface pluginDerivedOptions {
	cwd: string,
}

class TimetrackerPlugin {
	private writer: Writer;
	private reader: Reader;

	constructor(options: pluginOptions) {
		let cwd: string = options.forceCwd || process.cwd();
		let derivedOptions: pluginDerivedOptions = { cwd };

		this.writer = new Writer(options, derivedOptions)
		this.reader = new Reader(options, derivedOptions)
	}

	apply(compiler: compiler.Compiler) {
		compiler.plugin('done', () => {
			this.writer.writeActivity();
			console.log(this.writer);
		});
	}
}

module.exports = TimetrackerPlugin;
