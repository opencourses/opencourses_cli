#!/usr/bin/env node

const chalk = require('chalk')
var yargs = require('yargs')
var configs = require('./configs.js')
var utils = require('./utils.js');


configs.read_config_file(function(err) {
    if (err) {
        console.log(chalk.red('Your project does not contains a config file.'));
        console.log(chalk.red('You can init your project using the init command.'));
    }
    yargs.commandDir('commands')
        .epilogue('You can read more about the Open Courses project on https://github.com/opencourses/manifesto')
        .demandCommand()
        .help()
        .argv
});
