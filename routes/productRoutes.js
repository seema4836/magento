const express=require("express");
const router=express.Router();
const mongoose= require('mongoose');
const Category=require('../model/category');
const Product=require('../model/product');
const path  = require('path');

var multer  = require('multer')

//router.use("/uploads", express.static(path.join(__dirname+"/server/uploads")))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
       cb(null, Date.now() + path.extname(file.originalname)) 
       
    }
  })
 // var storage = multer.memoryStorage()
  var upload=multer({storage:storage})


  
// get category 
router.get('/',(req,res,next)=>{
    
    Category.find().then(result=>{  
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

// Add New Category

router.post('/',(req,res,next)=>{

   // console.log(req.body.cname)
    cname=req.body.cname
    //console.log(cname)
    const category = new Category({
        _id:new mongoose.Types.ObjectId,
        cname:cname
    })
    
    category.save().then(result=>{
        console.log(result)
        res.status(200).json({
            msg:"Category Added",
            newUser:result
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
             error:err
        })

    })
})

// Delete cat by id
 // delete user by id

 router.delete('/:id',(req,res,next)=>{
    Category.remove({_id:req.params.id}).then(result=>{
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

   // get products
   router.get('/product',(req,res,next)=>{
    
    Product.find().populate('catid').then(result=>{
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
// Add product


router.post('/product', upload.single('image'),(req, res) => {
   // const url=req.protocol+ '://' + req.get("host");
//    // console.log(`new upload = ${req.file.filename}\n`);
  console.log(req.file);
  req.body.imageUrl='http://localhost:3000/uploads/'+req.file.filename
   res.json({ msg: 'Upload Works' 


 }); 

// });
  let product= new Product({
      pname:req.body.pname,
      price:req.body.price,
      description:req.body.description,
      catid:req.body.catid,
      image:req.body.imageUrl

  });
  product.save().then((docs)=>{
    return res.status(200).json({
       
        success:true,
        message:'New Data recorded',
        data:docs
    })
})
.catch((err)=>{
    return res.status(401).json({
        success:false,
        message:'Error in adding data',
        error:err.message
    })
})
})
    module.exports=router;