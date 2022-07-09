const { Console } = require('console');
const fs = require('fs');
const path = require('path');
const DATABASE_NAME = "database.txt";

function register(username, password){
    return new Promise(
        (resolve, reject) => {
            const absPath = path.join(__dirname, DATABASE_NAME);
            // Check if username exists
            fs.readFile(absPath, (err, data) => {
                if(err){
                    console.log("File does not exists, creating one");
                    fs.appendFile(absPath, `\n${username} ${password}`, (err) =>{
                        if(err){
                            return reject(err);
                        }else{
                            return resolve();
                        }
                    });
                }else{
                    // If match is not found
                    console.log("File does exists, checking user");
                    if(!data.toString().includes(username)){
                        fs.appendFile(absPath, `\n${username} ${password}`, (err) =>{
                            if(err){
                                return reject(err);
                            }else{
                                console.log("User does not exists, added");
                                return resolve();
                            }
                        });
                    }else{
                        console.log("User already exists, no change");
                    }
                }
            });
        }
    );
};

function createABlog(blogName){
    return new Promise(
        (resolve, reject) => {
            fs.mkdir(path.join(__dirname, blogName), (err) =>{
                if(err){
                    return reject(err);
                }else{
                    console.log("Folder %s created successfully!", blogName);
                    return resolve();
                }
            });
        }
    );
};

function formatPost(content){
    return `likes:0
likedBy:
${content}`;
}

function formatPostTitle(postTitle){
    return postTitle.replace(/( )/g, '_');
}


function createPost(postTitle, postContent, blogName){
    return new Promise(
        (resolve, reject) => {
            const folder = path.join(__dirname, blogName);
            const pTformatted = formatPostTitle(postTitle);
            fs.writeFile(path.join(folder, pTformatted), formatPost(postContent), (err)=>{
                if(err){
                    console.error("ERROR: Post could not be created.");
                    return reject(err);
                }else{
                    return resolve();
                }
            });
        }
    );
};

function likePost(blogName, postTitle, username){
    return new Promise(
        (resolve, reject) => {
            const database = path.join(__dirname, DATABASE_NAME);
            const pTformatted = formatPostTitle(postTitle);
            // Search user
            console.log(database);
            fs.readFile(database, (err, data) => {
                if(err){
                    return reject(err);
                }
                if(!data.toString().includes(username)){
                    return reject(new Error(`User not found in database ${blogName}`));
                }

                const blogPath = path.join(__dirname, blogName);
                const postPath = path.join(blogPath, pTformatted);
                // Search post
                fs.readFile(postPath, (err, data) => {
                    if(err){
                        return reject(err);
                    }

                    // Get number of likes
                    let stringData = data.toString();
                    const LIKEDBY = 'likedBy:';
                    const end = stringData.search(/likedBy:/);
                    const line = stringData.substring(0, end);
                    const start = line.search(/\d+/);
                    const number = Number(stringData.substring(start, line.length-1));

                    // Add likes
                    stringData = stringData.replace(`likes:${number}`, `likes:${number+1}`);
                    // Add user
                    stringData = stringData.slice(0, end+LIKEDBY.length)+username+', '+stringData.slice(end+LIKEDBY.length);

                    fs.writeFile(postPath, stringData, (err) => {
                        if(err){
                            return reject(err);
                        }                        
                    });

                    resolve(stringData);

                });
            });
        }
    );
};

module.exports = {register, createABlog, createPost, likePost};