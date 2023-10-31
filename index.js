//---------------------- Importing Module and Packages ----------------------//
const express = require("express")
const app = express()
const route = require("./src/routes/route.js")
const mongoose = require("mongoose");

app.use(express.json())

mongoose.set('strictQuery', true);
//---------------------- Make Relation Between MongoDb and Nodejs with MongoDb Cluster Link  ----------------------//
mongoose.connect("mongodb+srv://Amrata:Y99l58O8175g88R8@cluster0.xictrjh.mongodb.net/Zygal-DB" , {useNewUrlParser:true})
.then(() => console.log("server is connected"))
.catch((err) => console.log(err.message))
//---------------------- Global Middleware for All Route ----------------------//
app.use('/',route)
//---------------------- PORT ----------------------//
 app.listen(3000, function(){
    console.log("express is running on port 3000")
})

