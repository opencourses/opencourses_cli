const chalk = require('chalk');
var fs = require('fs');
var mkdirp = require('mkdirp');
var configs = require('../configs.js');
var utils = require('../utils.js');

exports.command = 'init'
exports.desc = 'Initialize a new course repository'
exports.builder = {
    force: {
        alias: 'f',
        describe: 'Forces to init the course even if a course config file is present'
    }
}
exports.handler = function (argv) {
    course_init(argv);
}

function course_init(argv) {
    // This function should:
    // (0) Check if there is already a
    if (!argv.force && utils.check_file_existence(configs.course_file)) {
        console.log('Your course is already initialized. You can override it using the --force argument');
        process.exit();
    }
    console.log(chalk.green('Initializing a new course repository'));
    // (1) Create the configuration file empty
    fs.createReadStream(configs.course_template).pipe(fs.createWriteStream(configs.course_file));
    // (2) Create the exercise folder
    mkdirp("exercises", function(err) {
        if (err) {
            console.log("Error creating the exercise folder. Please check to have the permissions to do it");
            return err;
        }
        // (3) Inform the user on the next moves
        console.log("To start creating the course please modify the "+configs.course_template+" file");
    });
}
