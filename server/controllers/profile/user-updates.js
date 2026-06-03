import { User } from "../../models/User.js"

export const updateUserDetails = async (req,res)=>{
    const userId = req.user.id
    const body = req.body


    console.log(body,"from body")   
    try{
        if(body.password){
            delete body.password
        }

        if(body.email){
            delete body.email
        }

        const updatedUser = await User.findByIdAndUpdate(userId,body,{new:true,runValidators:true}).select('-password')

        console.log(updatedUser)
        if(!updatedUser){
            return res.status(404).json({message:'User not found'})
        }

        res.status(201).json({message:'ok',updatedUser})
    }catch(err){
        res.status(500).json({message:err.message})
    }

    
}