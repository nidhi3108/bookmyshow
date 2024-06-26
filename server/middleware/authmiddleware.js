const jwt = require('jsonwebtoken')

module.exports = function(req,res){
    try{
        console.log(req.headers);
   const token = req.headers.authorization.split(" ")[1];
   console.log(token);
   const decode = jwt.verify(token, process.env.jwt_secret)
   req.body.userdataId= decode.userdataId;
    } catch (err){
        console.log("Error->", err);
        res.status(401).send({
            success: false,
            message: "Invalid token"
        })
    }
}
