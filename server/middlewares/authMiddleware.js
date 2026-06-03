import jwt from 'jsonwebtoken'

export function authMiddleware(req,res,next){
    const token = req.headers.authorization.split(" ")[1]

    if(!token){
        return res.status(401).json({message:'Token not provided'})
    }

    try{

        const userPayload = jwt.verify(token,process.env.TOKEN_SECRET_KEY) 

        if(!userPayload){
            return res.status(401).json({message:'Token not valid'})
        }

        req.user = userPayload

        next()
    }catch(err){
        if(err.name == "TokenExpiredError"){
            res.status(401).json({message:'Token expired'})
        }

        if(err.name == "JsonWebTokenError"){
            res.status(401).json({message:'Invalid Token'})
        }

        res.status(500).json({message:'Inetrnal server error'})
    }
}