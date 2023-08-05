const mongoose = require('mongoose');
const { Schema } = mongoose;
const Users=require('./users')
const contractSchema = new Schema({
    Contract_ID:String,
    Contract_Name:String,
    Contract_Status:String,
    Contract_Type:String,
    Contract_StartDate:String,
    Contract_EndData:String,
    Description:String,
    User_id:{
      type: Schema.Types.ObjectId,
      ref:Users
    }
  });
  

module.exports = mongoose.model('Contract',contractSchema);