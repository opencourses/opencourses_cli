#!/usr/bin/env node

const chalk = require('chalk')
var yargs = require('yargs')
var configs = require('./configs.js')

if (configs.check_file_existence()) {
    configs.read_config_file();
} else {
    console.log(chalk.red('Your project does not contains a config file.'));
    console.log(chalk.red('You can init your project using the init command.'));
}
yargs.commandDir('commands')
    .demandCommand()
    .help()
    .argv
