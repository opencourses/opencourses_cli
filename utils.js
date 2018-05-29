var fs = require('fs');
var concat = require('concat-stream');
var toml = require('toml');

module.exports = {
    check_file_existence: function(name) {
        if (!fs.existsSync(name)) {
            return false;
        }
        return true;
    },

    check_dir_existence: function(name) {
        if (!fs.existsSync(name)) {
            return false;
        }
        if (!fs.statSync(name).isDirectory()) {
            return false;
        }
        return true;
    },

    get_dirs: function(dir) {
        fileList = [];
        var files = fs.readdirSync(dir);
        for(var i in files){
            if (!files.hasOwnProperty(i)) continue;
            var name = dir+'/'+files[i];
            if (fs.statSync(name).isDirectory()){
                fileList.push(files[i]);
            }
        }
        return fileList;
    },

    pad: function(num) {
        var s = num+"";
        while (s.length < 2) s = "0" + s;
        return s;
    },

    parse_toml: function(file_name, callback) {
        if (!this.check_file_existence(file_name)) {
            return callback(new Error('The file is not present'));
        }
        fs.createReadStream(file_name, 'utf8').pipe(concat(function(data) {
            try {
                var data = toml.parse(data);
            } catch (e) {
                console.error("Error parsing the " + file_name + " file");
                console.error("Parsing error on line " + e.line + ", column " + e.column +
                    ": " + e.message);
                return callback(e);
            }
            return callback(null, data);
        }));
    }
}


