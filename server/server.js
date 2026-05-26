import express from 'express'
import cors from 'cors'
import jsonwebtoken from 'jsonwebtoken'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
// import uuid from 'uuid'
import dotenv from 'dotenv'
dotenv.config()

const app=express()

app.use(cors())

const Db_Uri=process.env.Db_Uri
mongoose.connect(Db_Uri).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})




const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})