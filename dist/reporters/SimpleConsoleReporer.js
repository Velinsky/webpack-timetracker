"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
// import pad from 'pad'
class SimpleConsoleReporer {
    reportActivity(activity) {
        let hours = Math.round(activity.total.time / 60);
        console.log('');
        console.log(chalk_1.default.underline('Total time spent on repository:') + ' ' + chalk_1.default.green(hours.toString()) + ' ' + chalk_1.default.reset('hours'));
        console.log('');
        console.log(chalk_1.default.dim('Breakdown by user'));
        activity.byUser.forEach(user => {
            let userHours = Math.round(user.total.time / 60);
            console.log(chalk_1.default.reset(user.name + ':') + ' ' + chalk_1.default.green(userHours.toString()) + ' ' + chalk_1.default.reset('hours'));
        });
        console.log('');
    }
}
exports.SimpleConsoleReporer = SimpleConsoleReporer;
//# sourceMappingURL=SimpleConsoleReporer.js.map