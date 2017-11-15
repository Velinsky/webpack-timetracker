let path = require('path');
let TimeTracker = require('./plugin/main.js');

module.exports = {
	entry: './testapp/entry.js',
	output: {
		path: path.join(path.resolve(__dirname), 'out'),
		filename: 'bundle.js'
	},
	devServer: {
		publicPath: '/out/'
	},
	plugins: [new TimeTracker({
		forceCwd: __dirname,
	})]

};
