const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
var userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fname:{
        type:String,
        required:[true,'Name should not be left blank']
    },
    lname:{
        type:String,
        required:[true,'Name should not be left blank']
    },
    email:{
        type:String,
        unique:[true,'Email Already Exists']
    },
   
    password:{
        type:String,
        required:[true,'password should not left empty'],
        minlength:[4,'Password should be greater than 4']
    },
    resetToken:String,
    expireToken:String,
    created_at    : { type: Date, required: true, default: Date.now 


    }

});


//methods for encrypting password

// registerSchema.pre('save',function(next){
//     bcrypt.genSalt(15,(err,salt)=>{
//         bcrypt.hash(this.password,salt,(err,hash)=>{
//             this.password=hash,
//             this.saltString=salt
//             next();
//         })
//     })

// });

// registerSchema.methods.verifyPassword = function(password){
//     return bcrypt.compareSync(password,this.password);
// }

 module.exports=mongoose.model('User',userSchema);
