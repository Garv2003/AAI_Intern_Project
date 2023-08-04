const mongoose = require('mongoose');
const { Schema } = mongoose;

const contractSchema = new Schema({
    contractID:String,
    contractname:String,
    contractstatus:String,
    contracttype:String,
    contractstartdate:String,
    contractenddata:String,
    description:string
  });
  

module.exports = mongoose.model('Contract',contractSchema);