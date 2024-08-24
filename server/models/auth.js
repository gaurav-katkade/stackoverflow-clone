import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    about:{type:String},
    tags:{type:[String]},
    reset_token:{type:String},
    reset_token_exp:{type:Date,default:Date.now+30000},
    joinedOn:{type:Date,default:Date.now},
})

export default mongoose.model("User",userSchema);