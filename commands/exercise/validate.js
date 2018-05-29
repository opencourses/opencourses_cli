const chalk = require('chalk');
var exercise = require('./exercise.js');

exports.command = 'validate <number>'
exports.desc = 'Validates the content of an exercise folder'
exports.builder = function(yargs) {
    return yargs.number('number');
}
exports.handler = function (argv) {
    if (isNaN(argv.number)) {
        console.log("You should provide an exercise number");
        return;
    }
    var args = {
        number: argv.number,
    }
    var result = exercise.validate(argv, function(err, data) {
        if (err) throw err;
        console.log(chalk.green('Exercise '+argv.number+' ('+exercise.get_exercise_name(argv.number)+')'));
        if (data.valid) {
            console.log("The exercise is valid");
        } else {
            console.log("The exercise is not valid");
            console.log("Try to fix these errors");
            console.log(data.errors);
        }
    });
}
