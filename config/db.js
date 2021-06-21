const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/myapp",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>{
    console.log("Database connected succesfully")
}).catch((err)=>{
    console.log("Error in Connection with database " +err);
})