import OpenAI from "openai";
import {GoogleGenAI} from '@google/genai';
import Groq from 'groq-sdk'
import dotenv from 'dotenv'
import { endInterviewPrompt } from "../../utils/prompts.js";
dotenv.config()

// const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


async function askAi({messages}){

    const prompt = messages.map((item)=>{
        return `${item.role} : ${item.content}`
    }).join("\n")

    try{
        //using gemini ai api 
        // const response = await ai.models.generateContent({
        //     model: 'gemini-2.5-flash',
        //     contents: prompt
        // });

        // return response.text

        const response = await groq.chat.completions.create({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages,
            temperature: 0.7,
            max_completion_tokens: 1000
        });

        return response.choices[0].message.content;

    }catch(err){
        return Promise.reject(err)
    }
}

async function getFeedbackFromAi({messages}){
    const prompt = messages.map((item)=>{
        return `${item.role} : ${item.content}`
    }).join("\n")

    try{

        // const response = await ai.models.generateContent({
        //     model: 'gemini-2.5-flash',
        //     contents: prompt,
        //     config: {
        //         responseMimeType: "application/json"
        //     }
        // });

        // return response.text
        const response = await groq.chat.completions.create({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages,
            temperature: 0.2,
            response_format: {
                type: "json_object"
            }
        });

        
        return response.choices[0].message.content

    }catch(err){
        return Promise.reject(err)
    }
}


export {askAi,getFeedbackFromAi}