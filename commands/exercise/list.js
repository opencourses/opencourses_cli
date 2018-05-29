const chalk = require('chalk');
var configs = require('../../configs.js');
var utils = require('../../utils.js');

exports.command = 'list'
exports.desc = 'Lists all the available exercises'
exports.builder = {
    deep: {
        alias: ['d'],
        description: "Shows the content of all the folders"
    }
}
exports.handler = function (argv) {
    var folders = list_dirs(argv);
    console.log(configs.parsed.exercise_dir+"/");
    console.log("    │");
    dirs.forEach(function(item) {
       console.log("    ├──"+item);
    });
}

function list(argv) {
    var dirs = utils.get_dirs(configs.parsed.exercise_dir);
    var max = 0;

    dirs.forEach(function(item) {
       console.log("    ├──"+item);
    });

}
