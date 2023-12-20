const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    name:String,
    token: String
  });
  

module.exports = mongoose.model('Users',userSchema);