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
    if (isNaN(argv.number)) {
        console.log("You should provide an exercise number");
        return;
    }
    var args = {
        number: argv.number,
    }
    var result = validate(argv, function(err, data) {
        if (err) throw err;
        console.log(chalk.green('Exercise '+argv.number+' ('+get_exercise_name(argv.number)+')'));
        if (data.valid) {
            console.log("The exercise is valid");
        } else {
            console.log("The exercise is not valid");
            console.log("Try to fix these errors");
            console.log(data.errors);
        }
    });
}

function get_exercise_name(number) {
    return configs.parsed.exercise_prefix+'_'+utils.pad(number);

}

function get_exercise_path(name) {
    return configs.parsed.exercise_dir+'/'+name+'/exercise.toml';
}

function remove_matching(data, exclude_regex) {
    for (var item in data) {
        exclude_regex.forEach(function(exclude) {
            if (item.match(exclude)) {
                delete data[item];
            }
        });
    }
}

/*
 * Args must contain:
 *  - number <- the numeber of the exercise to be validated
 *
 */
function validate(args, cb) {
    var exercise_name = get_exercise_name(args.number);
    var exercise_path = get_exercise_path(exercise_name);
    var exclude_regex = [ 'comment\d*' ];

    utils.parse_toml(exercise_path, function(err, data) {
        if (err) {
            console.error(chalk.red('Error while reading the exercise configuration file'));
            return;
        }
        remove_matching(data, exclude_regex);
        fs.readFile(configs.parsed.exercise_schema, 'utf8', function(err, parsed_json) {
            if (err) {
                console.error("Error reading exercise schema");
                throw err;
            }
            var schema = JSON.parse(parsed_json);
            var result = revalidator.validate(data, schema);
            cb(err, result);
        });
    });
}

