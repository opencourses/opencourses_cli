exports.command = 'exercise'
exports.desc = 'Print the list of exercises'
exports.builder = function (yargs) {
    return yargs.commandDir('exercise_cmd')
}
exports.handler = function (argv) {
    console.log('You need at least one opearation')
}
