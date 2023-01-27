"use strict";
const { response } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);


const Schema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    response:{
        type:String,
        required:true
    }
})

Schema.plugin(autoIncrement.plugin, { model: 'Questions', field: 'id', startAt: 1, incrementBy: 1 });

const Question=mongoose.model("Questions",Schema)

Question.updateOne({}, { $set: { id: 0 } }, { upsert: true }, function(err, response) {
    if (err) {
        console.log(err);
    } else {
        console.log("Counter reset");
    }
});

const Qrouter = express.Router();

Qrouter.post("",async (req,res)=>{
    const {content,response} = req.body;
    
    if(!content || !response){
        res.status(404).json({message:"uncomplete query"})
    }
    const question = new Question({
        content:content,
        response:response
    })
    try{
    const dataQ =  await question.save()
    res.json({dataQ:dataQ});
    }catch(err){
        res.status(500).send({message:err})
    }

})

Qrouter.put("/:idQuestion",async (req,res)=>{
    
    let idQuestion = req.params.idQuestion
    const Nresponse = req.body.response
    try{
	let myQuestion = await Question.findOne({id:idQuestion})
    if(!myQuestion)
        throw ("not allowed sorry")
        

    myQuestion.response = Nresponse
    

    res.json({myQuestion})

    
    }
    catch(err){
        res.status(500).send({message:err})
    }
})

Qrouter.delete("/:idQuestion",async (req,res)=>{
    
    let idQuestion = req.params.idQuestion
    try{
	const myQuestion = await Question.findOne({_id:idQuestion})
    if(!myQuestion)
        throw ("not allowed sorry")
        

    await Question.remove(myQuestion)
    

    res.json({message:'delete with success'})

    
    }
    catch(err){
        res.status(500).send({message:err})
    }
})

module.exports.Qrouter = Qrouter;
