import { askAi, getFeedbackFromAi } from "../controllers/interview/aiinterview.js"
import { Interview } from "../models/Interview.js"
import { startInterviewPrompt,endInterviewPrompt } from "../utils/prompts.js"

const interviewSessions = new Map()


function interviewSocket(socket){

    const userId = socket.userId

    socket.on("start-interview",async(setup)=>{
        
        try{

            const session = {
                userId,
                stack :setup.stack,
                difficultyLevel :setup.difficulty,
                duration : setup.duration,
                experience : setup.experience,
                startedAt : new Date(),
                conversation : [
                    {
                        role: "system",

                        content: startInterviewPrompt(setup)
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
                role : "assistant",
                content : nextQuestion
            })

            socket.emit("ai-question",{question : nextQuestion})

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
        console.log("calling from end interview" )

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
    
            let userReport = await getFeedbackFromAi({messages: session.conversation})

            userReport = JSON.parse(userReport)
         
            if(userReport){
                session.conversation.push({
                    role : "assistant",
                    content : JSON.stringify(userReport)
                })
                addInterview(session,userReport)
            }

            socket.emit("speak-feedback",{feedback : userReport.feedback})
            
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

    interviewData.duration = session.duration

    interviewData.experience = session.experience

    interviewData.weakAreas = userReport.weakAreas

    interviewData.strongAreas = userReport.strongAreas

    interviewData.feedback = userReport.feedback

    interviewData.conversation = session.conversation

    interviewData.startedAt = session.startedAt

    interviewData.endedAt = session.endedAt

    const interview = await Interview.create(interviewData)

}


export default interviewSocket