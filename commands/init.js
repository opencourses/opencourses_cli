var configs = require('../configs.js');
exports.command = 'init'
exports.desc = 'Initialize a new course repository'
exports.builder = {
    force: {
        alias: 'f',
        describe: 'Forces to init the course even if a course config file is present'
    }
}
exports.handler = function (argv) {
    console.log(configs.check_file_existence());
    if (!argv.force && !configs.check_file_existence()) {
        console.log('Your course is already initialized. You can override it using the --force argument');
    }
    console.log('Initializing a new course repository')
    course_init(argv);
}

function course_init(argv) {

}
