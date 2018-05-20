exports.command = 'validate <name>'
exports.desc = 'Validates the content of exercise <name>'
exports.builder = {}
exports.handler = function (argv) {
    console.log('Validates the content of exercise '+argv.name)
}

