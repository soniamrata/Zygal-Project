const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
  userName: {
      type: String,
      required: true
  },
    email: {
      type: String,
      required: true
    },
    password:{
        type:String,
        required:true
    },
    token:{
      type:String

    },
   
}, { timestamps: true })
  
  module.exports = mongoose.model('Registration', userSchema);