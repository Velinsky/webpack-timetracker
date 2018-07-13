"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const ramda_1 = require("ramda");
const fs = require("fs");
const moment = require("moment");
const filesystemConsts_1 = require("./filesystemConsts");
const createIfNotExists = (cwd) => (path) => ramda_1.unless(fs_1.existsSync, fs_1.mkdirSync)(path_1.join(cwd, path));
class Writer {
    constructor(cfg, derivedCfg) {
        this.options = cfg;
        this.derivedOptions = derivedCfg;
        // check structure
        let createLocal = createIfNotExists(this.derivedOptions.cwd);
        createLocal(this.options.directoryName);
    }
    writeActivity(filenames = []) {
        filenames = filenames
            // save only relative paths
            .map((file) => file.replace(this.derivedOptions.cwd, ''))
            // surround with ", in case theres a dash (,) in the filename
            .map((file) => `"${file}"`);
        let formattedDate = moment().format('YYYY-MM-DD HH:mm:ss ZZ');
        let csvData = [formattedDate, filesystemConsts_1.CSV_FILES_OPCODE].concat(filenames);
        let path = this.derivedOptions.cwd + '/' + this.options.directoryName + '/' + this.derivedOptions.userId;
        fs.appendFileSync(path, csvData.join(',') + '\n');
    }
}
exports.default = Writer;
//# sourceMappingURL=writer.js.map