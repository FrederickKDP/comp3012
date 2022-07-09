const fs = require('fs');
const path = require('path');
const process = require('process');

// Returns square root
function squareRoot(number){
    return Math.sqrt(number);
}

// Returns square
function square(number){
    return Math.pow(number, 2);
}

// Returns square root of square of x2 minus x1, plus y2 minus y1
function distance(x1, x2, y1, y2){
    let dist = squareRoot(square(x2-x1)+square(y2-y1));
    return dist;
}

// Processes input
function processInput(){
    
    //fs.writeFile(path.join(folder,"points.txt"), dist.toString(), function (err){});
    
    // Get relevant input
    const x = [process.argv[2], process.argv[3]];
    const y = [process.argv[4], process.argv[5]];
    
    // Calculate distance
    const dist = distance(x[0], x[1], y[0], y[1]);
    
    // Build message
    const msg = "The distance between your two points: ("+x+"), ("+y+") is "+dist+"\n";
    
    // Make directory if needed
    const folder = path.join(__dirname, 'dataPoints');
    fs.access(folder, (err) => {
        // If folder does not exists
        if(err){
            // Make the dir
            fs.mkdir(folder, (err) =>{
                if (err) {
                    return console.error(err);
                }
                console.log('Directory created successfully!');                   
            });
        }

        // Append/create file
        fs.appendFile(path.join(folder,"points.txt"), msg, (err) =>{
            if(err){
                console.log("Error on creating file!\nYour message was;\n"+msg+"\n");
                return console.error(err);
            }else{
                console.log("Content saved");
                //fs.close()
            }
        });
    });

}

processInput();