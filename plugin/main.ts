import { compiler } from 'webpack';
import Writer from './writer';

export interface pluginOptions {
	forceCwd: string,
}

class TimetrackerPlugin {
	private writer: Writer;

	constructor(options: pluginOptions) {
		let cwd: string = options.forceCwd || process.cwd();

		this.writer = new Writer(options)
	}

	apply(compiler: compiler.Compiler) {
		compiler.plugin('done', () => {
			this.writer.writeActivity();
			console.log(this.writer);
		});
	}
}

module.exports = TimetrackerPlugin;
