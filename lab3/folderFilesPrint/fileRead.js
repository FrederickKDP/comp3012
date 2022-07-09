const fs        = require('fs');

const listFiles = (absPath, extension) => {
    const folder    = absPath;
    const ext       = extension;

    fs.readdir(folder, (err, files) => {
        if(err){
            console.err(err);
        }else{
            console.log(`\nCurrent directory files with extension \"%s\":`, ext);
            files.forEach(file => {
                if(file.endsWith(ext)){
                    console.log(file);
                }
            })
        }
    })
}

module.exports = listFiles;