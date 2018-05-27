exports.command = 'edit <name>'
exports.desc = 'Edits the exercise <name>'
exports.builder = {}
exports.handler = function (argv) {
    console.log('Editing exercise %s',argv.name)
    toTOMLString(data, function (err, output) {
        if (err) throw err
        console.log(output)
    })
}

