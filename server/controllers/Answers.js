import mongoose  from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer=async(req,res)=>{
    // console.log('we are reaching the post ans controller')
    const {id:_id} = req.params;
    const {noOfAnswers,answerBody,userAnswered,userId}= req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unavailable")

    }
    updateNoOfQuestions(_id,noOfAnswers)
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody,userAnswered,userId}]}})
        // console.log("🚀 ~ controller ~ postAnswer ~ updatedQuestion:", updatedQuestion)
       
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json(error)
    }
}

const updateNoOfQuestions = async(_id,noOfAnswers)=>{
    try {
        await Questions.findByIdAndUpdate(_id,{$set:{'noOfAnswers':noOfAnswers}})
    } catch (error) {
        console.log(`controller -> answer.js -> ${error}`)
    }
}

export const deleteAnswer = async(req,res)=>{
    const {id:_id} = req.params;
    const {answerId,noOfAnswers} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Qusetion Unavailable....")
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send("Answer Unavailable....")
    }
    updateNoOfQuestions(_id,noOfAnswers)
    try {
        await Questions.updateOne(
            {_id},
            {$pull:{'answer':{_id:answerId}}}
        )
        res.status(200).json({message:"successfully deleted ...."})
    } catch (error) {
        
    }
}