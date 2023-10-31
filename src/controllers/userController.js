const userModel = require("../models/userModel.js")
const {isvalidEmail,isvalidpassword} = require('../validators/validator.js')
const jwt = require("jsonwebtoken")

const signUp = async (req,res)=>{
    try{
    let data = req.body
    if (Object.keys(data) == 0) {
        return res.status(400).send({ status: false, message: "No input provided" })} 
    let {userName,email,password} = data
    if(!userName) return res.status(400).send({status:false,message:"userName is required"})
    if(!email) return res.status(400).send({status:false,message:"email is required"})
    if(!isvalidEmail(email)) return res.status(400).send({status:false, message:"wrong email"})
    if(!password) return res.status(400).send({status:false,message:"password is required"})
    if(!isvalidpassword(password)) return res.status.send({status:false,message:"password is incorrect"})

const registerUser = await userModel.create(data) 
return res.status(201).send({ status: true, message:"successfull",data: registerUser })
    }catch(err){
        res.status(500).send({status:false,Message:err.message})
    }
}

const signIn = async(req,res)=>{
    try{
   const data = req.body
   const{email,password}= data
   if(!email) {return res.status(400).send({ status: false, message: "email or password is missing" })} 
   if(!isvalidEmail(email)) return res.status(400).send({status:false, message:"wrong email"})
   if (!password) {  return res.status(400).send({ status: false, message: "password is missing" }) }
   if(!isvalidpassword(password)) return res.status.send({status:false,message:"password incorrect"})
   const user = await userModel.findOne({email:email},{password:password})
   if(!user) return res.status(400).send({status:false,message:"The email you entered isn't connected to an account"})
   const token = jwt.sign({ userId: user._id},'secret-key',{expiresIn:"7d"})
   const update = await userModel.findByIdAndUpdate(user._id,{token:token})
   res.setHeader("authorization", token)
   res.status(200).send({ status: true, data: token })
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

const searchdata = async (req,res)=>{
    try{
        const data = req.token
    
        const showprofile = await userModel.findOne({userId : data._id},{__v:0},{password:0})
        return res.status(200).send({status:true,Data:showprofile})
        }catch(err){
            return res.status(500).send({status:false,message:err.message})
        }
    
}
const logout = async (req,res)=>{
    try{
      const token = req.token;
      const deleteToken = await userModel.findByIdAndUpdate({userId:token[userId]} , {token:null})
      res.status(200).send({ status: true, message: " token is deleted " })
  
    }catch(error){
      return res.status(500).send({staus:false,message:error.message})
    }
  }




module.exports={signUp, signIn, searchdata,logout}