import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Interview } from '../../models/Interview.js'
dotenv.config()

export const  getInterview = async (req,res)=>{

    const token = req.body.token 

    if(!token){
        res.status(401).json({message : "Token not provided"})
    }

    try{
        const userData = jwt.verify(token,process.env.TOKEN_SECRET_KEY)
    
        const userId = userData.id
    
        const interview = await Interview.find({userId})
    
        res.status(201).json({message : "ok" ,interview})
        
    }catch(err){
        res.status(400).json({message : err.message})
    }

}