/*
 * File Name: main.js
 * Description:
 *
 * Created Date: 07/22/22
 * Author: Frederick Kramer Dal Pra
 *
 */

const fs = require("fs").promises;
const {createReadStream, createWriteStream} = require("fs");

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;


IOhandler.unzip("./myfile.zip", "./unzipped/")
  .then(() => IOhandler.readDir(pathUnzipped))
  .then((filePaths)=>{
    filePaths.forEach((path) => {
      IOhandler.grayScale(path, pathProcessed)
    });
  })
  .catch(err => console.log(err));

  