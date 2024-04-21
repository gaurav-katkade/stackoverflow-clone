import mongoose from "mongoose";
import user from '../models/auth.js'

export const getAllUsers= async(req,res)=>{
    try {
        const allUsers = await user.find()
        // console.log("🚀 ~ getAllUsers ~ allUsers:", allUsers)
        
        const allUserDetails = []
        allUsers.forEach(users => {
            allUserDetails.push({
                _id:users._id,
                name:users.name,
                about:users.about,
                tags:users.tags,
                joinedOn:users.joinedOn
            })
        });
        
        // console.log("🚀 ~ getAllUsers ~ allUserDetails :", allUserDetails )
        res.status(200).json(allUserDetails)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const updateProfile = async(req,res)=>{
    // console.log("reached the update profile")
    const {id:_id} = req.params;
    const {name,about,tags} = req.body;
    // console.log("controller -> Users.js -> req.body :",req.body)
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable')
    }
    try {
        const updateProfile = await user.findByIdAndUpdate(_id,{$set:{name:name,about:about,tags:tags}},{new :true})
        // console.log("controller -> User.js -> UpdatedProfile : ",updateProfile)
        res.status(200).json(updateProfile)
    } catch (error) {
        res.status(405).json({message:error.message})
    }
}