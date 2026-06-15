import React, { useActionState, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../api-s/interceptors'
import socket from '../interviewSocket'
import { startListening, stopListening, textToSpeech } from '../utils/speech'
import aiDummy from '../assets/aiDummy.jpeg'
import { INTERVIEW_STAGES } from '../constants'

function NewInterview() {
  const aiContentContainer = useRef()
  const [userText,setUserText] = useState("")
  const [spokenText,setSpokenText] = useState("")
  const [question,setQuestion] = useState("First Question")
  const [buttonText,setButtonText] = useState("Start")
  const [currentStage,setCurrentStage] = useState(INTERVIEW_STAGES.DID_NOT_ANSWER_YET)
  const [buttonStyle,setButtonStyle] = useState("bg-blue-400")
  const [isAiSpeaking,setIsAiSpeaking] = useState(false)

  async function callingAi(e){
    e.preventDefault()

    if(!userText){
      toast.error("Enter prompt to ai")
      return 
    }

    try{
      const aiResponse = await api.post('/interview/liveInterview',{prompt:userText})
      console.log(aiResponse)
      aiContentContainer.current.innerText = aiResponse.data
    }catch(err){
      toast.error(err.message)
    }
  }

  function askQuestion(){
    socket.emit("start-interview",{message:"Lets start the interview"})
    socket.on("ai-question",(data)=>{
      console.log(data.question)
      if(data.question){
        textToSpeech(data.question,setIsAiSpeaking)
      }
    })
  }


  function handleStartButton(){

    if(currentStage == INTERVIEW_STAGES.DID_NOT_ANSWER_YET){
      startListening(setSpokenText)
      setButtonText("Stop")
      setCurrentStage(INTERVIEW_STAGES.ANSWERING)
      setButtonStyle("bg-orange-500")
    }
    else if(currentStage == INTERVIEW_STAGES.ANSWERING){
      stopListening()
      setButtonText("Submit")
      setCurrentStage(INTERVIEW_STAGES.COMPLETED_ANSWERING)
      setButtonStyle("bg-green-500")
    }
    else if(currentStage == INTERVIEW_STAGES.COMPLETED_ANSWERING){
      socket.emit("submit-answer",{answer : spokenText})
      setSpokenText("")
      setButtonText("Start")
      setQuestion("")
      setCurrentStage(INTERVIEW_STAGES.DID_NOT_ANSWER_YET)
      setButtonStyle("bg-blue-500")
    }
    
  }

  function endInterview(){
    socket.emit("end-conversation")
  }

  useEffect(()=>{
    socket.connect()

    return ()=>{
      socket.off("end-interview")
      socket.disconnect()
    }
    
  },[])
  return (
    <div className='flex h-screen justify-center relative'>
        {/* <form onSubmit={callingAi} className='flex justify-center gap-3 mt-3'>
          <textarea type="text" className='shadow-2xl w-80' placeholder='Ask ai' onChange={(e)=>setUserText(e.target.value)}></textarea>
          <input type="submit" className={`${!userText.length?"bg-bl–ue-200":"bg-blue-400 cursor-pointer"} rounded-xl' value="Submit`} />
        </form>
        <div className='flex justify-center gap-5 '>
          <button onClick={()=>startListening(setSpokenText)} className='bg-blue-400 w-12 h-10 cursor-pointer rounded-xl'>Start</button>
          <button onClick={stopListening} className='bg-blue-400 w-12 h-10 cursor-pointer rounded-xl'>Stop</button>
        </div>
        <button onClick={startInterview}>Start Interview</button>

        <textarea value={spokenText} onChange={(e)=>setSpokenText(e.target.value)}></textarea>
        <div ref={aiContentContainer}>

        </div> */}

        <div className='absolute top-20.5'>
          <img src={aiDummy} alt='could not load image' className={`h-60 rounded-3xl ${isAiSpeaking?"opacity-100":"opacity-50"}`} />
          <h3 className='font-bold text-xl'>{question}</h3>
        </div>
        <div className='absolute top-100.5 flex'>
          <textarea onChange={(e)=>setSpokenText(e.target.value)} value={spokenText} className='border w-190 rounded shadow-2xl'></textarea>
          <button className= {` ${buttonStyle} text-white rounded w-18 h-10 cursor-pointer`} onClick={handleStartButton}>{buttonText}</button>
        </div>
        <div>
          <button className='bg-blue-600 cursor-pointer' onClick={askQuestion}>Get Question</button>
        </div>
        <div>
          <button className='bg-blue-600 cursor-pointer' onClick={endInterview}>End Interview</button>
        </div>
    </div>
  )
}

export default NewInterview 