"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const writer_1 = require("./mappers/filesystemMapper/writer");
const reader_1 = require("./mappers/filesystemMapper/reader");
const defaultTimeSpentAnalyzer_1 = require("./timeSpentAnalyzers/defaultTimeSpentAnalyzer");
const SimpleConsoleReporer_1 = require("./reporters/SimpleConsoleReporer");
var UsernameStrategy;
(function (UsernameStrategy) {
    UsernameStrategy["GitEmail"] = "gitemail";
    UsernameStrategy["GitName"] = "gitname";
    UsernameStrategy["WhoAmI"] = "unixuser";
    UsernameStrategy["Test"] = "test";
})(UsernameStrategy = exports.UsernameStrategy || (exports.UsernameStrategy = {}));
let defaultOptions = {
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
    constructor(options) {
        options = Object.assign(options, defaultOptions);
        let cwd = options.forceCwd || process.cwd();
        let selectedStrategy = usernameStrategies[options.usernameStrategy];
        let userIdPromise;
        if (typeof selectedStrategy === 'string') {
            userIdPromise = Promise.resolve(child_process_1.execSync(selectedStrategy).toString().trim());
        }
        else if (selectedStrategy instanceof Promise) {
            userIdPromise = selectedStrategy();
        }
        userIdPromise.then((userId) => {
            let derivedOptions = { cwd, userId };
            this.writer = new writer_1.default(options, derivedOptions);
            this.reader = new reader_1.default(options, derivedOptions);
            let rawActivity = this.reader.readActivity();
            let analyzer = new defaultTimeSpentAnalyzer_1.default(options);
            let activity = analyzer.analyzeActivity(rawActivity);
            let reporter = new SimpleConsoleReporer_1.SimpleConsoleReporer();
            reporter.reportActivity(activity);
        });
    }
    apply(compiler) {
        compiler.plugin('watch-run', (watching, done) => {
            // older versions of webpack have the watchFileSystem data on compiler object
            const changedTimes = watching.compiler
                ? watching.compiler.watchFileSystem.watcher.mtimes
                : watching.watchFileSystem.watcher.mtimes;
            const changedFiles = Object
                .keys(changedTimes);
            this.writer.writeActivity(changedFiles);
            done();
        });
    }
}
module.exports = TimetrackerPlugin;
//# sourceMappingURL=main.js.map