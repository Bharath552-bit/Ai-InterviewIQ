import OpenAI from "openai";
import {GoogleGenAI} from '@google/genai';
import dotenv from 'dotenv'
dotenv.config()

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export const aiInterview = async (req,res)=>{

    const body = req.body
    if(!body){
        return res.status(401).json({message:"Prompt not provided"})
    }
    
    // using openai 
    // const client = new OpenAI({
    //     apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
    // });

    // const response = await client.responses.create({
    //     model: 'gpt-5.5',
    //     input: body.prompt
    // });

    // using gemini
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: body.prompt,
    });


    console.log(response)

    res.status(200).json({message:'ok',data:response.text})
}