#!/usr/bin/env node

var yargs = require('yargs')

// (1) Parse arguments
yargs
    .commandDir('commands')
    .demandCommand()
    .help()
    .argv
// (2) Parse toml file
// (3) Invoke the corrent function according to the command
