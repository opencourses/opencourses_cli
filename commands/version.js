exports.command = 'version'
exports.desc = 'Prints the program version'
exports.builder = {
    dir: {
        default: '.'
    }
}
exports.handler = function(argv) {
    console.log('Current version is 1.0.0');
}
