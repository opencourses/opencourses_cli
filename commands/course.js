exports.command = 'course'
exports.desc = 'Print the current course'
exports.builder = function(yargs) {
    return yargs.commandDir('course');
}
exports.handler = function (argv) {
    console.log('Print detailed informations on the current course')
}
