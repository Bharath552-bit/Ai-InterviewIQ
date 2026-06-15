import { askAi } from "../controllers/interview/aiinterview.js"
import { Interview } from "../models/Interview.js"

const interviewSessions = new Map()

function interviewSocket(socket){

    // socket.on("first-message",(data)=>{
    //     console.log(data)
    //     socket.emit("first-response",{message:"ok good now lets move to interview"})
    // })
    // socket.on("second-message",(data)=>{
    //     console.log(data)
    //     socket.emit("second-response",{message:"tell me about javaScript"})
    // })

    socket.on("start-interview",async({stack = "MERN",experience = "fresher"})=>{
        
        try{

            const session = {
                stack,
                experience,
                conversation : [
                    {
                        role: "system",

                        content: `
                    You are an expert Senior Technical Interviewer conducting a real-world job interview.

                    Candidate Information:

                    Tech Stack: ${stack}
                    Experience Level: ${experience}

                    Your objective is to simulate a professional technical interview exactly like top companies which use ai for taking interviews.

                    Interview Guidelines:

                    Ask ONLY ONE question at a time.// this is the main point
                    Base every question on:
                        Candidate's technology stack
                        Experience level
                        Previous answers
                    Never jump to unrelated topics abruptly.
                    Begin with fundamental concepts and gradually increase difficulty.
                    Ask follow-up questions whenever:
                        The answer is incomplete
                        The answer lacks depth
                        The answer is partially correct
                        The candidate uses vague explanations
                    Challenge weak answers professionally:
                        Ask for examples
                        Ask for implementation details
                        Ask edge cases
                        Ask performance implications
                        Ask tradeoffs
                        Ask real-world usage scenarios
                    If the answer is incorrect:
                        Do NOT reveal the correct answer
                        Do NOT teach the concept
                        Ask guiding follow-up questions to assess understanding
                    If the answer is strong:
                        Acknowledge briefly
                        Increase difficulty gradually
                        Maintain interview context throughout the conversation.
                        Behave like a real interviewer, not a tutor.
                    Never:
                        Give hints
                        Provide solutions
                        Explain concepts
                        Reveal expected answers
                        Break character
                        Prefer practical and scenario-based questions over theoretical definitions.
                    For experienced candidates:
                        Focus on architecture
                        Scalability
                        System design
                        Optimization
                        Security
                        Production issues
                    For junior candidates:
                        Focus on fundamentals
                        Coding concepts
                        Problem solving
                        Framework understanding
                    Ask the next interview question now.
                    `
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
        const session = interviewSessions.get(socket.id)

        if(!session){
            return
        }

        session.conversation.push({
            role : "system",
            content : `
        You are a senior technical interviewer. 
        Evaluate the FULL interview transcript provided by the user.

        Return ONLY valid JSON — no markdown, no explanation.

        Scoring rules:
        - technicalScore: integer 0-10. Base on correctness, depth, React practical, DSA, JS fundamentals.
        - communicationScore: integer 0-5. Base on clarity, structure, English fluency, confidence.
        - strongAreas: array of  strings (skills where candidate was solid)
        - weakAreas: array of strings (skills to improve)
        - feedback : string (how candidate performed overall throughout the interview)
        - roadMap: object with 7 days for week 1, each day is a specific task

        JSON schema to follow exactly:
        {
        "technicalScore": 8,
        "communicationScore": 2,
        "strongAreas": ["react", "react-router", "react-practical"],
        "weakAreas": ["DSA", "JS fundamentals", "Constructor function"],
        "feedback" : "You were good with explination part, theory part but should practice more on practical part in question 1 you strugged to create crud operation"
        "roadMap": {
            "day1": "DSA basics - arrays and time complexity",
            "day2": "JS fundamentals - closures and hoisting",
            "day3": "Constructor functions vs classes",
            "day4": "Practice 5 LeetCode easy array problems",
            "day5": "React practical - build small router app",
            "day6": "Mock interview - explain code out loud",
            "day7": "Review weak areas and retake quiz"
        }
        }`
        })

        const userReport = await askAi({messages: session.conversation})
 

        if(userReport){
            addInterview(userReport)
        }
        

        interviewSessions.delete(socket.id)
    })

    socket.on("disconnect",()=>{
        
        interviewSessions.delete(socket.id)

        console.log("Disconnected: ",socket.id)
    })

}


async function addInterview(userReport){
    
    let feedback = userReport
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

    feedback = JSON.parse(feedback)

    // feedback[conversation] = interviewSessions.get(socket.id)
    
    const interviewData = await Interview.create(feedback)

    console.log(interviewData)
    
    const newInterview = await Interview.create()
}

export default interviewSocket