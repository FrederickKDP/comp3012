const fs        = require('fs');

const listFiles = (absPath, extension, callback) => {
    const folder    = absPath;
    const ext       = extension;

    fs.readdir(folder, (err, files) => {
        if(err){
            callback(new Error("Folder could not be read."), null);
        }else{
            let found = new Array();
            if(files.length<=0){
                callback(new Error("Folder has no files."), null);
            }
            files.forEach(file => {
                if(file.endsWith(ext)){
                    found.push(file);
                }
            })
            callback(null, found);
        }
    })
}

module.exports = listFiles;