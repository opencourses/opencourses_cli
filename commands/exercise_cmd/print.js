const chalk = require('chalk');
var configs = require('../../configs.js');
var utils = require('../../utils.js');
var toTOMLString = require('toml-stream').toTOMLString

exports.command = 'print <number>'
exports.desc = 'Prints the exercise data'
exports.builder = function(yargs) {
    return yargs.number('number');
}
exports.handler = function (argv) {
    print(argv);
}

function print(argv) {
    if (isNaN(argv.number)) {
        console.log("You should provide an exercise number");
        return;
    }
    var exercise_name = configs.parsed.exercise_prefix+'_'+utils.pad(argv.number);
    var exercise_path = configs.parsed.exercise_dir+'/'+exercise_name+'/exercise.toml';
    var exclude_regex = ["comment\d*"];
    utils.parse_toml(exercise_path, function(err, data) {
        if (err) {
            console.error(chalk.red('Error while reading the exercise configuration file'));
            return;
        }
        console.log(chalk.green('Exercise '+argv.number+' ('+exercise_name+')'));
        for (var item in data) {
            var valid = true;
            exclude_regex.forEach(function(exclude) {
                if (item.match(exclude)) {
                    valid = false;
                }
            });
            if (valid) {
                print_item(item.charAt(0).toUpperCase()+item.slice(1), data[item]);
            }
        };
    });
}

function print_item(name, item) {
    console.log(chalk.green(name+": ")+item);
}
