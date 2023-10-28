
const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken")
const userController = require('../controllers/userController.js')
const {isvalidEmail,isvalidpassword} = require('../validators/validator.js')


let authentication = async function (req, res, next) {
    try {
         let bearerHeader = req.headers["authorization"]; 
      if (!bearerHeader) {
        return res
          .status(401)
          .send({
            status: false,
            message: "Token is missing! please enter token.",
          })}
     
      let decodedToken=jwt.verify(token,"secret-key")
     if(!decodedToken) return res.status(401).send({status:false,message:"token is invalid"})
  
     const userDetails = await userModel.findById({userId:decodedToken.userId})
    if(!userDetails) return res.status(400).send({status:false,message:"no such user exist "})
    res.status(401).send({stats:true, data: userDetails})
  req.userDetails = userDetails
    req.token = decodedToken,
          next()
      }
      catch(error){
          return res.status(500).send({status:false, error:error.message})
      }
  }
  module.exports = {authentication}

