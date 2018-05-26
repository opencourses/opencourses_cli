const chalk = require('chalk');
var toml = require('toml');
var concat = require('concat-stream');
var fs = require('fs');
var utils = require('./utils.js');

var my_course_file = 'course.toml';
var my_course_template = 'course_template.toml'
var my_parsed = {}

module.exports = {
    course_file: my_course_file,
    course_template: my_course_template,
    parsed: my_parsed,

    read_config_file: function(callback) {
        if (!utils.check_file_existence(my_course_template)) {
            return callback(new Error('The file is not present'));
        }
        fs.createReadStream(my_course_file, 'utf8').pipe(concat(function(data) {
            try {
                my_course_file_parsed = toml.parse(data);
            } catch (e) {
                console.error("Error parsing the " + my_course_file + " file");
                console.error("Parsing error on line " + e.line + ", column " + e.column +
                    ": " + e.message);
                return callback(e);
            }
            set_defaults();
            return callback(null);
        }));
    }
}

function set_defaults() {
    var defaults = {
        exercise_dir: "exercises",
        exercise_prefix: "exercise"
    }
    for (const [key, value] of Object.entries(defaults)) {
        if (my_parsed[key] == null) {
            my_parsed[key] = value;
        }
    }
}
