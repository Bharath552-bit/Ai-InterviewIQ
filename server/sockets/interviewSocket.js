import { askAi, getFeedbackFromAi } from "../controllers/interview/aiinterview.js"
import { Interview } from "../models/Interview.js"
import { startInterviewPrompt,endInterviewPrompt } from "../utils/prompts.js"

const interviewSessions = new Map()


function interviewSocket(socket){

    const userId = socket.userId

    // socket.on("first-message",(data)=>{
    //     console.log(data)
    //     socket.emit("first-response",{message:"ok good now lets move to interview"})
    // })
    // socket.on("second-message",(data)=>{
    //     console.log(data)
    //     socket.emit("second-response",{message:"tell me about javaScript"})
    // })

    socket.on("start-interview",async({stack = "MERN",difficultyLevel = "fresher"})=>{
        
        try{

            const session = {
                userId,
                stack,
                difficultyLevel,
                startedAt : new Date(),
                conversation : [
                    {
                        role: "system",

                        content: startInterviewPrompt(stack,difficultyLevel)
                    }
                ]
            }

            interviewSessions.set(socket.id,session)

            const firstQuestion = await askAi({messages : session.conversation})  

            session.conversation.push({
                role : "assistant",
                content : firstQuestion 
            })

            socket.emit("ai-question",{question : firstQuestion})

        }catch(err){
            console.log(err)
            socket.emit("error",{message : err.message})
        }
    })

    socket.on("submit-answer",async({answer})=>{

        console.log(answer,"from  submit")

        try{

            const session = interviewSessions.get(socket.id)

            if(!session){
                return
            }

            session.conversation.push({
                role : "user",
                content : answer
            })

            const nextQuestion = await askAi({messages : session.conversation})

            session.conversation.push({
                role : "assistance",
                content : nextQuestion
            })

            socket.emit("next-question",{question : nextQuestion})

        }catch(err){
            console.log(err)
            socket.emit("error",{message : err.message})
        }
    })

    socket.on("get-conversation",()=>{
        const session = interviewSessions.get(socket.id)

        if(!session){
            return
        }

        socket.emit("conversation-data",session?.conversation||[])
    })

    socket.on("end-conversation",async ()=>{

        try{
            const session = interviewSessions.get(socket.id)
    
            if(!session){
                return
            }

            session.endedAt = new Date()
    
            session.conversation.push({
                role : "system",
                content : endInterviewPrompt()
            })
    
            // const userReport = await getFeedbackFromAi({messages: session.conversation})
            const dummyConversation = [{ role: "assistant", content: "Explain promise in javascript" }, { role: "user", content: "Promise is an object, we use promises to handle async tasks, it has 2 stages resolved and rejected" }, { role: "stystem", content: endInterviewPrompt() }]
            let userReport = await getFeedbackFromAi({messages : dummyConversation})

            userReport = JSON.parse(userReport)
         
            if(userReport){
                session.conversation.push({
                    role : "assistance",
                    content : userReport
                })
                addInterview(session,userReport)
            }
            
            interviewSessions.delete(socket.id)
        }catch(err){
            console.log(err)
            socket.emit('error',{message : err.message})
        }
    })

    socket.on("disconnect",()=>{
        
        interviewSessions.delete(socket.id)

        console.log("Disconnected: ",socket.id)
    })

}


async function addInterview(session,userReport){

    const interviewData = {}

    interviewData.userId = session.userId

    interviewData.technicalScore = userReport.technicalScore

    interviewData.communicationScore = userReport.communicationScore

    interviewData.stack = session.stack

    interviewData.difficultyLevel = session.difficultyLevel

    interviewData.weakAreas = userReport.weakAreas

    interviewData.strongAreas = userReport.strongAreas

    interviewData.feedback = userReport.feedback

    // interviewData.conversation = 

    interviewData.startedAt = session.startedAt

    interviewData.endedAt = session.endedAt

    const interview = await Interview.create(interviewData)

}


export default interviewSocket