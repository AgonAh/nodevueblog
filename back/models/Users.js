const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title : String,
    body : String,
    picture : String
});

const userSchema = mongoose.Schema({
    name : String,
    username : String,
    password : String,
    role : String,
    posts : [postSchema]
});

module.exports = mongoose.model('Users',userSchema);