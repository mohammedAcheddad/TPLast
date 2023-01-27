"use strict";
const express = require("express");
const mongoose= require('mongoose');
const { Qrouter } = require("./routes");
const autoIncrement = require('mongoose-auto-increment');



const app = express();
app.use(express.json())
app.use(express.static("./public"))

mongoose.connect
("mongodb+srv://icemed7001:EGTMv7zHkbP2COBy@cluster0.ruzcwsz.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log("connected to mongodb atlas"))
.catch(err=>console.log(err))

app.use("/Questions",Qrouter)

app.listen(30000, (err)=>{
    if (err) console.log(err)
    console.log('listening on port 3000')
})

module.exports.autoIncrement = autoIncrement;