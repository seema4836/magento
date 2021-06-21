const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
//creating CategorySchema
var CategorySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    cname: { type: String, unique: true, lowercase: true, required: true}
   
  });




 module.exports=mongoose.model('Category',CategorySchema);
