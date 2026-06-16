import jwt from 'jsonwebtoken'

export function socketMiddleware(socket,next){
    const token = socket.handshake.auth.token
    
        if(!token){
            socket.emit("auth",{message : "Token not provided"})
            socket.off()
        }
    
        try{
            const userData = jwt.verify(token,process.env.TOKEN_SECRET_KEY)
    
            console.log(userData)
    
            console.log(userData.id,"from token")
    
            socket.userId = userData.id
    
            next()
        }catch(err){
            console.log(err)
            socket.off()
        }
}