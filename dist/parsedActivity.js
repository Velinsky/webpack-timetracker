"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
// sample
let x = {
    byUser: [
        {
            name: 'test',
            total: {
                time: 123
            }
        }
    ],
    byFile: [
        {
            path: '/test/js.js',
            total: {
                time: 123
            }
        }
    ],
    total: {
        time: 123
    },
    rawData: {
        users: [{
                id: 'test',
                entries: [{
                        files: ['a', 'b'],
                        time: moment()
                    }]
            }],
    }
};
//# sourceMappingURL=parsedActivity.js.map