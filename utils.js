var fs = require('fs');

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
                fileList.push(name);
            }
        }
        return fileList;
    },

    pad: function(num) {
        var s = num+"";
        while (s.length < 2) s = "0" + s;
        return s;
    }
}


