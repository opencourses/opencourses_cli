const chalk = require('chalk');
var configs = require('../../configs.js');
var utils = require('../../utils.js');
var revalidator = require('revalidator');
var fs = require('fs');



exports.command = 'validate <number>'
exports.desc = 'Validates the content of an exercise folder'
exports.builder = function(yargs) {
    return yargs.number('number');
}
exports.handler = function (argv) {
    validate(argv);
}

function validate(argv) {
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
            exclude_regex.forEach(function(exclude) {
                if (item.match(exclude)) {
                    delete data[item];
                }
            });
        }
        fs.readFile('exercise_schema.json', 'utf8', function(err, parsed_json) {
            if (err) {
                console.error("Error reading exercise schema");
                throw err;
            }
            var schema = JSON.parse(parsed_json);
            var result = revalidator.validate(data, schema);
            if (result.valid) {
                console.log("The exercise is valid");
            } else {
                console.log("The exercise is not valid");
                console.log("Try to fix these errors");
                console.log(result.errors);
            }
        });
    });
}

