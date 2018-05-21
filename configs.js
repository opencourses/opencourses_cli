const chalk = require('chalk');
var toml = require('toml');
var concat = require('concat-stream');
var fs = require('fs');

var my_course_file = 'course.toml';
var my_course_template = 'course_template.toml'
var my_course_file_parsed;

module.exports = {
    course_file: my_course_file,
    course_template: my_course_template,
    course_file_parsed: my_course_file_parsed,

    check_file_existence: function() {
        if (!fs.existsSync(my_course_file)) {
            return false;
        }
        return true;
    },

    read_config_file: function() {
        fs.createReadStream(my_course_file, 'utf8').pipe(concat(function(data) {
            try {
                my_course_file_parsed = toml.parse(data);
            } catch (e) {
                console.error("Error parsing the %s file\n", my_course_file);
                console.error("Parsing error on line " + e.line + ", column " + e.column +
                    ": " + e.message);
                process.exit(1);
            }
        }));
    }
}
