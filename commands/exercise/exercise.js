var configs = require('../../configs');
var utils = require('../../utils');
var revalidator = require('revalidator');
var fs = require('fs');

module.exports = {
    get_exercise_name: function(number) {
        return configs.parsed.exercise_prefix+'_'+utils.pad(number);
    },

    get_exercise_path: function(name) {
        return configs.parsed.exercise_dir+'/'+name+'/exercise.toml';
    },

    remove_matching: function(data, exclude_regex) {
        for (var item in data) {
            exclude_regex.forEach(function(exclude) {
                if (item.match(exclude)) {
                    delete data[item];
                }
            });
        }
    },

    /*
     * Args must contain: number <- the numeber of the exercise to be validated
     */
    validate: function(args, cb) {
        var exercise_name = module.exports.get_exercise_name(args.number);
        var exercise_path = module.exports.get_exercise_path(exercise_name);
        var exclude_regex = [ 'comment\d*' ];

        utils.parse_toml(exercise_path, function(err, data) {
            if (err) {
                console.error(chalk.red('Error while reading the exercise configuration file'));
                return;
            }
            module.exports.remove_matching(data, exclude_regex);
            fs.readFile(configs.parsed.exercise_schema, 'utf8', function(err, parsed_json) {
                if (err) {
                    console.error("Error reading exercise schema");
                    throw err;
                }
                var schema = JSON.parse(parsed_json);
                var result = revalidator.validate(data, schema);
                cb(err, result);
            });
        });
    },

}
