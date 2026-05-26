import jwt from 'jsonwebtoken'

export const generateToken = (userData)=>{

    const token = jwt.sign(userData,process.env.TOKEN_SECRET_KEY)

    return token
}