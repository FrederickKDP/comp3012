const process   = require('process');
const listFiles  = require("./fileRead")

listFiles(process.argv[2], process.argv[3], (err, files) =>{
    if(err){
        console.err(err);
    }else{
        console.log("\nFiles found:");
        files.forEach(file => {
            console.log(file);
        })
        console.log("\n");
    }
});