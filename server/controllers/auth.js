import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import users from '../models/auth.js'
import nodemailer from 'nodemailer'
import otpGenerator from 'otp-generator'
// const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

// var OTP
// ,User;

export const signUp = async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        const existingUser = await  users.findOne({email});
        if(existingUser){
            return res.status(404).json({message:"User already exist"})
        }
        const hashedPassword = await bcrypt.hash(password,6);
        const newUser = await users.create({name,email,password:hashedPassword})
        const token = jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({result:newUser,token})
    } catch (error) {
        res.status(500).json(`Something went wrong in sign up ${error}`)
    }

}
export const login = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const existingUser = await users.findOne({email});
        if(!existingUser){
            return res.status(404).json({message:"User Don't Exists"})
 
        }
        const isPasswordCrt = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCrt){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},process.env.JWT_SECRET,{expiresIn:'1hr'})
        res.status(200).json({result:existingUser,token})
    } catch(error){
        res.status(500).json(`Something went wrong in login ${error}`)
    }
}

export const forgotPassController=async(req,res)=>{
    const {email,mobile_no} = req.body;
    const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

    const existing_user  = await users.findOneAndUpdate({email}, {reset_token:OTP,reset_token:Date.now+30000},);

    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "OTP : StackOverflow", // Subject line
        text: `OTP : ${OTP}`, // plain text body
        html: "<b>HELLO</b>", // html body
      });

    res.status(200).json(`OTP send succesfully : ${info}`)
}

export const resetPassword = async(req,res)=>{
    const {email,user_otp,new_password} = req.body();
    // const existingUser = await users.findOne({email});

    const hashedPassword = await bcrypt.hash(new_password,6);


    if(existingUser.reset_token === user_otp && existingUser.reset_token_exp > Date.now){
         const existing_user  = await users.findOneAndUpdate({email}, {password:hashedPassword,reset_token:"",reset_token_exp:null});
        return res.status(200).json({message:"password reset successfull"})
    }

    res.status(200).json({message:"Unable to reset password"})
}