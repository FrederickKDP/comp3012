/*
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author: Frederick Kramer Dal Pra
 *
 */

const { rejects } = require("assert");

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  // return new Promise(
  //   (resolve, reject)=>{
  //     fs.createReadStream(pathIn)
  //     //.pipe(unzipper.Extract({path: pathOut}));
  //       .pipe(unzipper.Extract({ path: pathOut}))
  //       .on('error', reject)
  //       .on('finish', resolve)
  //   }
  // );
  return fs.createReadStream(pathIn)
  //.pipe(unzipper.Extract({path: pathOut}));
    .pipe(unzipper.Extract({ path: pathOut}))
    .promise();
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject)=>{
    const files = fs.readdir(dir, (err, files)=>{
      if(err){
        reject(err);
      }else{
        // Format and clean files
        let formatted = [];
        files.forEach((item)=>{
          if(path.extname(item) === '.png'){
            let fileFormat = path.join(dir, item);
            formatted.push(fileFormat);
          }
        });

        resolve(formatted);
      }
    });
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject)=>{
    fs.createReadStream(pathIn)
    .pipe(new PNG())
    .on("parsed", function(){
      for(var y = 0; y < this.height; y++){
        for(var x = 0; x < this.width; x++){
          var idx = (this.width * y + x) << 2;

          //average values
          var average = (this.data[idx]+this.data[idx+1]+this.data[idx+2])/3;

          this.data[idx] = average;
          this.data[idx+1] = average;
          this.data[idx+2] = average;

          // invert color
          //this.data[idx] = 255 - this.data[idx];
          //this.data[idx + 1] = 255 - this.data[idx + 1];
          //this.data[idx + 2] = 255 - this.data[idx + 2];

          // and reduce opacity
          //this.data[idx + 3] = this.data[idx + 3] >> 1;
        }
      }

      // Format path out
      const fileName = path.basename(pathIn);
      const newOut = path.join(pathOut, fileName);

      this.pack().pipe(fs.createWriteStream(newOut))
        .on('error', reject)
        .on('finish', resolve);
    })
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
