
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
//creating CategorySchema
const productSchema = new mongoose.Schema({

   
    pname:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
image:{
    type:String
},
   
   catid:{type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
}
   
   
  });




 module.exports=mongoose.model('Product',productSchema);
