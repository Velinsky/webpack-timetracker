# What is it
Webpack plugin to track time spent working on a webpack project.

![screenshot of simple console reporter](https://raw.githubusercontent.com/Velinsky/webpack-timetracker/master/docs/simpleReporter.png)

## Install

```
npm install webpack-timetracker
yarn add webpack-timetracker
```

## Usage

Simply import the plugin and use it in webpack config. No further configuration needed!

A new directory will be created in the root of your project called `.webpacktime`. **Keep this directory and all files inside tracked by your VCS of choice.**

```
// sample webpack.config.js
let path = require('path');
let TimeTracker = require('./src/main.js');

module.exports = {
	entry: './testapp/entry.js',
	output: {
		path: path.join(path.resolve(__dirname), 'out'),
		filename: 'bundle.js'
	},
	devServer: {
		publicPath: '/out/'
	},
	plugins: [new TimeTracker({ })]
};

```

## Git dependency

If you are not using git as your tracking system, or does not have git command line tools installed, the plugin will fail to determine user name. You can choose to use other user name discovery strategy:
```
plugins: [new TimeTracker({
	usernameStrategy: 'unixuser'
})]
```

## How it works

After every webpack compilation, a log file is written with timestamp and list of changed files. Every user gets their own file. By default, the plugin treats intervals larger than 15 minutes as stopped work. So as long as two separate compilations happened 15 minutes of each other, the difference will be counted to total time spent.

## Development

Run these scripts:
```
// start typescript transpiler
npm run start:ts

// strat sample webpack project to test your plugin with
npm start
```

Then trigger webpack compilation with some changes in /testapp/*.js files.

The project is written in typescript and it is leveraging classes and interfaces in it's architecture. The layers are:

 - The plugin itself, connecting all the layers - Main.ts
 - Mappers(should find better name) - these persist and reads logs. Right now only one mapper is implemented - filesystem mapper. In the future, we can persist to mongo db or APIs. This will solve problem with git merges
 - Analyzer - reads data from mapper and does computations over it
 - Reporter - takes data from analyzer and does some visualisation over it (essentially displaying analyzed data to end user)

### Todo
 - ~~reporting~~
    - improve reporting (by day, by file)
 - Username strategy can be a promise = implement smart username strategy runner
 - Username strategy can be automatically detected
   - make sure that username won't change during development though
   - implement mergeusernames in config to report multiple users as a single user
 - detect file changes by git checkout (and similar) to prevent tracking polution
 - dependency injection - so we can declare other writers / readers in config
   - ~~Reader is only model for Reporter~~
 - add mongo persistence
 
