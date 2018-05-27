exports.command = 'validate <number>'
exports.desc = 'Validates the content of an exercise folder'
exports.builder = function(yargs) {
    return yargs.number('number');
}
exports.handler = function (argv) {
    validate(argv);
}

function validate(argv) {
    // This function must compare the content of the exercise toml with the
    // template file
}

