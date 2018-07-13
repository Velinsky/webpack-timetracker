"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse = require("csv-parse/lib/sync");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const filesystemConsts_1 = require("./filesystemConsts");
class Reader {
    constructor(cfg, derivedCfg) {
        this.options = cfg;
        this.derivedOptions = derivedCfg;
    }
    readActivity() {
        let dir = path.join(this.derivedOptions.cwd, this.options.directoryName);
        let users = [];
        fs.readdirSync(dir).forEach(file => {
            let input = fs.readFileSync(path.join(dir, file));
            let output = parse(input.toString(), { relax_column_count: true });
            let parsedOutput = output.map((entry) => {
                return {
                    time: moment(entry[0]),
                    files: entry.slice(entry.indexOf(filesystemConsts_1.CSV_FILES_OPCODE) + 1) // take all array elements after the opcode
                };
            });
            let userData = {
                entries: parsedOutput,
                id: file
            };
            users.push(userData);
        });
        return {
            users
        };
    }
}
exports.default = Reader;
//# sourceMappingURL=reader.js.map