"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const writer_1 = require("./writer");
const reader_1 = require("./reader");
const betterlog = require("better-log");
betterlog.setConfig({ depth: 2 });
var UsernameStrategy;
(function (UsernameStrategy) {
    UsernameStrategy["GitEmail"] = "gitemail";
    UsernameStrategy["GitName"] = "gitname";
    UsernameStrategy["WhoAmI"] = "unixuser";
})(UsernameStrategy || (UsernameStrategy = {}));
let defaultOptions = {
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
    constructor(options) {
        options = Object.assign(options, defaultOptions);
        let cwd = options.forceCwd || process.cwd();
        let userId = child_process_1.execSync(commandMap[options.usernameStrategy]).toString().trim();
        let derivedOptions = { cwd, userId };
        this.writer = new writer_1.default(options, derivedOptions);
        this.reader = new reader_1.default(options, derivedOptions);
    }
    apply(compiler) {
        compiler.plugin('watch-run', (watching, done) => {
            const changedTimes = watching.compiler.watchFileSystem.watcher.mtimes;
            const changedFiles = Object
                .keys(changedTimes);
            this.writer.writeActivity(changedFiles);
            done();
        });
    }
}
module.exports = TimetrackerPlugin;
//# sourceMappingURL=main.js.map