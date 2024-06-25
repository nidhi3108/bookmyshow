const express = require("express")
// const dotenv=require('dotenv')
const app= express();
const cors= require("cors")
const port = process.env.port || 8080;
const userRouter = require("./routes/userRouter")
require("dotenv").config();   //
console.log(process.env.test_name);
app.use (cors());

app.use(express.json());
app.use("/user", userRouter);


app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})

// module.exports = app;