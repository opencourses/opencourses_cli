exports.command = 'init'
exports.desc = 'Initialize a new course repository'
exports.builder = {
    dir: {
        default: '.'
    }
}
exports.handler = function (argv) {
    console.log('Initializing a new course repository')
}
