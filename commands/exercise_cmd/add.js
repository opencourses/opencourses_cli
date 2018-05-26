const chalk = require('chalk');
var mkdirp = require('mkdirp');
var ncp = require('ncp').ncp;
var configs = require('../../configs.js');
var utils = require('../../utils.js');

exports.command = 'add'
exports.desc = 'Adds a new exercise'
exports.builder = {
    template: {
        alias: 't',
        describe: 'Build the exercise from a specific template',
        default: 'empty'
    }
}
exports.handler = function (argv) {
    add(argv);
}

function add(argv) {
    // (0) Find the number of the new exercise
    var dirs = utils.get_dirs(configs.parsed.exercise_dir);
    var max = 0;
    dirs.forEach(function(item) {
        var arr = item.split('_');
        var number = parseInt(arr[1], 10);
        if (number > max) {
            max = number;
        }
    });
    // (1) Create a new folder for it
    var name = configs.parsed.exercise_prefix + '_' + utils.pad(max+1);
    if (argv.template == "empty") {
        mkdirp(configs.parsed.exercise_dir + '/' + name, function(err) {
            if (err) {
                console.error("Error creating exercise dir " + name);
                return err;
            }
        });
    } else {
        if (!utils.check_dir_existence('templates/'+argv.template)) {
            console.error("To create an exercise from a template you need to have the template folder");
            return;
        }
        ncp('templates/'+argv.template, configs.parsed.exercise_dir + '/' + name, function(err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Exercise created");
        });
    }

}

