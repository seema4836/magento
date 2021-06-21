 require('./config/db');
const express = require('express');  
const path = require('path');
const bodyparser = require('body-parser');
const userRoute=require('./routes/userRoutes');
const productRoute=require('./routes/productRoutes');
var multer = require('multer');
//var routes=require('../routes/userRoutes');
const port=process.env.PORT || 3000;
const User=require('./model/user');
const Category=require('./model/category');
const Product=require('./model/product');
//const session = require('express-session');
const cors = require("cors");
const app = express();
app.use(cors({origin:'http://localhost:4200'}));
//app.use(cors);
app.use(bodyparser.json());
// for parsing multipart/form-data
//app.use(upload.array()); 
//app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }))
app.use("/uploads", express.static(path.join(__dirname,"/uploads"))); 

// var static= 'E:/ekarma-pkl/angular/myap/server/uploads';
// app.use('/uploads', express.static(path.join(static, 'uploads')));
app.use('/users',userRoute);
app.use('/cat',productRoute);

app.use('/api',productRoute);

/*app.use(function (req, res, next) {

   // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();

  });
*/
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
//   next();
// });
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
  if (req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Credentials', true);
      return res.status(200).json({});
  }
  next();
});

//  app.post("/users",(req, res , next)=>{

//  const user= new user({
// fname:req.body.fname,
// lname:req.body.lname,
// email:req.body.email,
// password:req.body.password
// })
// console.log(user)
// res.status(200).json({
//     message:'User added Successfully'
//  });
// });



app.listen(port);