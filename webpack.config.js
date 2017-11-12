let path = require('path');

module.exports = {
	entry: './testapp/entry.js',
	output: {
		path: path.join(path.resolve(__dirname), 'out'),
		filename: 'bundle.js'
	},
	devServer: {
		publicPath: '/out/'
	}
};
