import mongoose from "mongoose"
import { User } from "../../models/User.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../../utils/generateJwtToken.js"

export const signUp = async(req,res)=>{
    try{
        console.log(req.body)
        const {name,email,password,age,phone} = req.body
    
        const isValidUser = await mongoose.connection.collection(process.env.VALID_USERS_COLLECTION).findOne({email})

        if(!isValidUser){
           return res.status(400).json({message:"This user does not exist"})
        }

        const isUserAlreadyExists = await User.findOne({email})

        if(isUserAlreadyExists){
           return res.status(400).json({message:"emailId already exists"})
        }

        req.body.password = await bcrypt.hash(password,10)

        const newUser = await User.create(req.body)

        return res.status(201).json({message:"ok"})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
} 

export const login=async(req,res)=>{
    const {email,password}=req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({message:"user does not exists"})
    }

    const passwordMatch=bcrypt.compare(password,user.password)

    if(!passwordMatch){
        return res.status(400).json({message:"Incorrect Password"})
    }

    const token=generateToken({email:user.email,id:user._id})

    res.status(200).json({message:"ok",token})


}