const chalk = require('chalk');
var readline = require('readline');
var configs = require('../../configs.js');
var utils = require('../../utils.js');
var toTOMLString = require('toml-stream').toTOMLString
var prompt = require('prompt');

exports.command = 'edit <number>'
exports.desc = 'Edits the exercise content in an iterative way'
exports.builder = function(yargs) {
    return yargs.number('number');
}
exports.handler = function (argv) {
    if (isNaN(argv.number)) {
        console.log("You should provide an exercise number");
        return;
    }
    prompt.message = "new";
    prompt.start();
    var exercise_name = configs.parsed.exercise_prefix+'_'+utils.pad(argv.number);
    var exercise_path = configs.parsed.exercise_dir+'/'+exercise_name+'/exercise.toml';
    utils.parse_toml(exercise_path, function(err, data) {
        if (err) {
            console.error(chalk.red('Error while reading the exercise configuration file'));
            return;
        }
        //var keys = Object.entries(data).filter((value, index) => !value[0].match('comment\d*'))
                //.map((value, index) => value[0]);
        //console.log(Object.entries(data));
        edit_dict(Object.entries(data).entries(), continuation);
    });
}

function continuation(err) {
    console.log("finished");
}

function edit_dict(iterator, callback) {
    if (iterator.next().done) {
        callback(null);
    }
    var item = iterator.next().value;
    var key = item[1][0];
    var value = item[1][1];
    if (key.match('comment\d*')) {
        return edit_dict(iterator);
    }
    console.log("current: "+ chalk.grey(key)+ ": " + value);
    prompt.get(key, function(err, result) {
        if (err) {
            callback(err);
            return;
        }
        return edit_dict(iterator);
    });
}
