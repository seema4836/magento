const express= require("express");
const router=express.Router();
const nodemailer = require("nodemailer");
const User=require('../model/user');
const mongoose= require('mongoose');
const crypto=require('crypto');
const user = require("../model/user");
// router.get('/',(req,res,next)=>{
// res.status(200).json({

//     msg:'user is shown'
// })
// });

// get users
router.get('/',(req,res,next)=>{
User.find().then(result=>{
    console.log(result);
res.status(200).json({
    userData:result
})

}).catch(err=>{
    console.log(err);
    res.status(500).json({
    error:err
    })
   
})



})

// get data by id
router.get('/:id',(req,res,next)=>{
console.log(req.params.id);
User.findById(req.params.id).then(result=>{
    console.warn(result)
    res.status(200).json({
        user:result
    })
}).catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
})


})

// add users

router.post('/',(req,res,next)=>{
   // console.log(req.body);
   const user = new User({
       _id:new mongoose.Types.ObjectId,
     fname:req.body.fname,
       lname:req.body.lname,
      email:req.body.email,
       password:req.body.password
   })
   //console.log(fname);
   user.save().then(result=>{
 console.log(result);
 res.status(200).json({
    newUser:result
})
   })
    
     .catch(err=>{
        console.log(err)
        res.status(500).json({
             error:err
        })

    })
    });

    // delete user by id

    router.delete('/:id',(req,res,next)=>{
     User.remove({_id:req.params.id}).then(result=>{
         console.warn(result);
         res.status(200).json({
msg:"Record Deleted",
res:result

         })
     }).catch(err=>{
         console.log(err);
         res.status(500).json({

             error:err
         })
     })

    })

    // update record by id
    router.put('/:id',(req,res,next)=>{
        console.log(req.params.id);
        User.findOneAndUpdate({_id:req.params.id},{
            $set:{
                fname:req.body.fname,
                lname:req.body.lname,
               email:req.body.email,
                password:req.body.password
            }
            }).then(result=>{
                console.warn(result)
                res.status(200).json({
                    updateUser:result
                })

            }).catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                })
            })
    })
    
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        //requireTLS:true,
        auth: {
          user: 'your gmal account', // generated ethereal user
          pass: '*******', // generated ethereal password
        }
      });

    // Forget Password
    router.post('/forgot-password',(req,res)=>{
       // console.log(req.body.email)
       if(!req.body.email){
           return res.status(500).json({
               msg:"Email is required"
           })
       }
       User.findOne({email:req.body.email}).then(user=>{
            if(!user){
                res.status(500).json({
                    error:"Email is not registered in database"
                })
            }
            const token=crypto.randomBytes(16).toString('hex');
            const link='http://localhost:3000/users/reset-password/'+token;
           // console.log(token);
           user.resetToken=token;
           user.expireToken=Date.now+360000;
           user.save().then((result)=>{
            transporter.sendMail({
                from: '"Simran Chauhan 👻" <thakursimrandeep@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: "Password Activated ✔", // Subject line
               text: "Please click on this link"+" "+link+" "+ 'to reset password', // plain text body
               
                })
                res.status(200).json({
                    msg:"Please check your email to reset password"
                })
           })


       })


    })



// Reset password
 router.post('/reset-password/:token',(req,res)=>{
        const getToken=req.params.token
        //console.warn(getToken)
        const newPassword=req.body.password
        User.findOne({resetToken:getToken,expireToken:{$gt:Date.now()}}).then(user=>{

            if(!user){
                return res.status(500).json({
                    error:"Token time session is expired now"
                })
                
            }
            bcrypt.hash(newPassword,10,function(err,hash){

                user.password=hash
                user.resetToken=undefined
                user.expireToken=undefined
                user.save().then((result)=>{
                    res.json({
                        msg:"Password updated successfully"
                    })
                })
            })

        }).catch(err=>{
            console.log(err)
        })

    })
   
   
module.exports=router;
