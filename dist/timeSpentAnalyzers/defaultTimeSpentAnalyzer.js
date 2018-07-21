"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
class DefaultTimeSpentAnalyzer {
    constructor(cfg) {
        this.options = cfg;
    }
    analyzeActivity(data) {
        let total = 0;
        let usersActivity = [];
        data.users.forEach(user => {
            let userTotal = 0;
            user.entries = user.entries.map(entry => (Object.assign({}, entry, { timestamp: +entry.time })));
            user.entries = ramda_1.sortBy(ramda_1.prop('timestamp'), user.entries);
            for (let i = 0; i < user.entries.length; i++) {
                const entry = user.entries[i].time;
                const prevEntry = user.entries[i - 1] ? user.entries[i - 1].time : null;
                if (!prevEntry)
                    continue;
                const timeDiff = entry.diff(prevEntry, 'minutes');
                if (timeDiff > this.options.workingThreshold)
                    continue;
                userTotal += timeDiff;
            }
            usersActivity.push({
                name: user.id,
                total: {
                    time: userTotal
                }
            });
            total += userTotal;
        });
        return {
            rawData: data,
            total: {
                time: total
            },
            byUser: usersActivity,
            byFile: [],
        };
        return undefined;
    }
}
exports.default = DefaultTimeSpentAnalyzer;
//# sourceMappingURL=defaultTimeSpentAnalyzer.js.map