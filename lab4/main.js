const {register, createABlog, createPost, likePost} = require("./blogger");

register('user', 'pass')
    .then(() => createABlog('myblog'))
    .then(() => createPost('title xd', 'this is a post', 'myblog'))
    .then(() => likePost('myblog', 'title xd', 'user'))
    .catch((err) => console.error(err));