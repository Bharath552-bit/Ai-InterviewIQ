import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
// import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import  authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import interviewRouter from './routes/interview.js'
import dns from 'node:dns'
import { profile } from 'node:console'
dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config()

const app=express()

app.use(cors())
app.use(express.json())

const Db_Uri=process.env.Db_Uri
mongoose.connect(Db_Uri).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err.message)
})


app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/interview",interviewRouter)


const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})