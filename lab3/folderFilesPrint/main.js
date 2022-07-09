const process   = require('process');
const listFiles  = require("./fileRead")

listFiles(process.argv[2], process.argv[3]);