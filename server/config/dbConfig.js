const mongoose = require("mongoose")
require('dotenv').config(); 
// mongoose.connect(process.env.MONGODB_URL,{});
mongoose.connect(process.env.MONGODB_URL)
.then((res)=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log(err);
    console.log("err in database connection");
})
// const connection =mongoose.connection;

// connection.on("connected",({})=>{
//     console.log("server connected")

// })
// .then((res)=>{
//     console.log("server connected successfully")
// })

// .catch((err)=>{
//     console.log(err);
//     console.log("err in database connection");
// })

module.exports= mongoose;