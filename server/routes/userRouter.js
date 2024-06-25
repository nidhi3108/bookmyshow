const router = require("express").Router();
const { response } = require("express");
const user = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authmiddleware = require("../middleware/authmiddleware");

router.post("/register", async (request, response) => {
  const salt = await bcrypt.genSalt(10);
  try {
      const userExists = await user.findOne({ email: request.body.email });
      if (userExists){
          response.status(403).send({
              success: false,
              message: "User already exists",
            });
            console.log("user already exist")
            return;
        }
        
    //will use hashing to protect data 
    const salt = await bcrypt.genSalt(10);  //10 is length of salt gensalt, hash is built in fn
    // console.log(10);
    const hashedPassword= await bcrypt.hash(request.body.password, salt);
    request.body.password= hashedPassword


    // if not user exists
    const newUser = new user(request.body);
    await newUser.save();
    response.status(200).send({
      success: true,
      message: "Register successful",
    });
  } catch (err) {
    console.log(err)
    response.status(500).send({
        success: true,
        message: "Something went wrong",
      });
  }
});

router.post('/login', async(request,response)=>{
  try{
    const userdata= await user.findOne({email: request.body.email})
    if (!userdata) {
      response.status(401).send({
          success: false,
          message: "User invalid credentials email",
        });
        return;
    }
     const validPassword= await bcrypt.compare(request.body.password, userdata.password);

     if(!validPassword){
      response.status(401).send({
        success: false,
        message: "User invalid credentials pass",
      });
      return;
     }
//                            payload what we want to embed in our token       secret kry             session time
    const token =  jwt.sign({userId:userdata._id ,emailId: userdata.email}, process.env.jwt_secret , {expiresIn: "1d"})


     response.status(200).send({
      success: true,
        message: "User logged in",
        data: token,
     })
    }

  catch(err){
    console.log(err)
    response.status(500).send({
        success: true,
        message: "Something went wrong pls try in 1 min",
      });
  }
});


router.get("/get-current-user", authmiddleware,  async (req,res)=>{
  try{
    const user= user.findById(req.body.userdataId).select("-password")
    ResizeObserverEntry.send({
      success : true,
      message : "user detail fetched sucessfully",
      data : user
    })
  } catch (err){
    res.status(500).send({
      success : false,
      message : "Something went wrong",
      data : user
    })
  }
})
module.exports=router