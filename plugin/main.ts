import { compiler } from '../node_modules/@types/webpack/index';

interface pluginOptions {
	forceCwd: string,
}

function HelloWorldPlugin(options: pluginOptions) {
	let cwd: string = options.forceCwd || process.cwd();
}

HelloWorldPlugin.prototype.apply = function (compiler: compiler.Compiler) {
	compiler.plugin('done', function () {
		console.log('compiling over');
	});
};

module.exports = HelloWorldPlugin;
