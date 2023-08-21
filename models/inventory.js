const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Contract=require("./contract")

const inventorySchema = new Schema({
    Invent_type:String,
    Invent_model:String,
    Invent_sno:String,
    Invent_End_Date:String,
    Invent_Start_Date:String,
    Invent_life_cycle:String,
    Invent_Invoice:String,
    Purchase_date:String
  });
  

module.exports = mongoose.model('Inventory',inventorySchema);