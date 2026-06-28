import React, { useActionState, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../api-s/interceptors'
import socket from '../interviewSocket'
import { startListening, stopListening, textToSpeech } from '../utils/speech'
import aiDummy from '../assets/aiDummy.jpeg'
import { INTERVIEW_STAGES } from '../constants'
import { useLocation, useNavigate } from 'react-router-dom'

function NewInterview() {
  const aiContentContainer = useRef()
  const navigate = useNavigate()
  const [userText,setUserText] = useState("")
  const [spokenText,setSpokenText] = useState("")
  const [question,setQuestion] = useState("")
  const [buttonText,setButtonText] = useState("Start Speaking")
  const [currentStage,setCurrentStage] = useState(INTERVIEW_STAGES.DID_NOT_ANSWER_YET)
  const [buttonStyle,setButtonStyle] = useState("bg-blue-400")
  const [isAiSpeaking,setIsAiSpeaking] = useState(false)
  const [timer,setTimer] = useState(5*60)
  const [isLastMinute,setIsLastMinute] = useState(false)
  const [isInterviewStarted,setIsInterviewStarted] = useState(false)
  const location = useLocation()
  const setup = location.state

  

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

  function startInterview(){
    setIsInterviewStarted(true)
    socket.emit("start-interview",setup)
    socket.on("ai-question",(data)=>{
      console.log(data.question)
      setQuestion(data.question)
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
      setButtonStyle("bg-amber-500 hover:bg-amber-600")
    }
    else if(currentStage == INTERVIEW_STAGES.ANSWERING){
      stopListening()
      setButtonText("Submit")
      setCurrentStage(INTERVIEW_STAGES.COMPLETED_ANSWERING)
      setButtonStyle("bg-green-600 hover:bg-green-700")
    }
    else if(currentStage == INTERVIEW_STAGES.COMPLETED_ANSWERING){
      socket.emit("submit-answer",{answer : spokenText})
      setSpokenText("")
      setButtonText("Start Speaking")
      setQuestion("")
      setCurrentStage(INTERVIEW_STAGES.DID_NOT_ANSWER_YET)
      setButtonStyle("bg-blue-600 hover:bg-blue-700")
    }
    
  }

  function endInterview(){
    socket.emit("end-conversation")
  }

  useEffect(()=>{
    socket.connect()
    socket.on("speak-feedback",(data)=>{
      if(data.feedback){
        textToSpeech(data.feedback,setIsAiSpeaking)
      }
    })

    return ()=>{
      socket.off("end-interview")
      socket.disconnect()
    }
  },[])

  useEffect(()=>{
    if (!setup) {
      navigate("/interview/setup");
    }
    if(setup){
      setTimer(setup.duration * 60)
      startInterview()
    }
    const interval = setInterval(()=>{
      setTimer((prev)=>{
        if(prev == 60){
          socket.emit("end-conversation")
          setIsLastMinute(true)
        }
        if(prev<=0){
          return 0
          clearInterval(interval)
        }
        else{
          return prev-1
        }
      })
    },1000)



    return ()=>{
      clearInterval(interval)
    }
  },[])
  return (
  <div className="h-screen overflow-hidden bg-slate-50 p-4">

    {/* Header */}
    <div className="max-w-6xl mx-auto flex justify-between items-center mb-4">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          AI Interview Session
        </h1>
        <p className="text-sm text-slate-500">
          Practice interviews with AI InterviewIQ
        </p>
      </div>

      <div className="flex items-center gap-3">

        <div
          className={`px-4 py-2 rounded-xl font-bold ${
            isLastMinute
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {Math.floor(timer / 60)}:
          {(timer % 60).toString().padStart(2, "0")}
        </div>

        <button
          onClick={endInterview}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 cursor-pointer shadow-md"
        >
          End Interview
        </button>

      </div>

    </div>

    {/* Main Content */}
    <div className="max-w-5xl mx-auto">

      {/* AI Section */}
      <div className="flex flex-col items-center">

        <div className="relative">

          {isAiSpeaking && (
            <>
              <div className="absolute inset-0 rounded-full bg-blue-300 animate-ping opacity-20 scale-125"></div>
              <div className="absolute inset-0 rounded-full bg-blue-200 animate-pulse opacity-40 scale-110"></div>
            </>
          )}

          <img
            src={aiDummy}
            alt="AI Interviewer"
            className={`relative z-10 w-40 h-40 rounded-full object-cover border-4 transition-all duration-300 ${
              isAiSpeaking
                ? "border-blue-500 shadow-2xl shadow-blue-300 scale-105"
                : "border-slate-200 shadow-xl"
            }`}
          />

        </div>

        <h2 className="mt-3 text-xl font-bold text-slate-800">
          AI Interviewer
        </h2>

        <p className="text-slate-500 text-sm mb-3">
          Your Personal Technical Interview Coach
        </p>

      </div>

      {/* Answer Section */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-5">

        <div className="mb-3">
          <h3 className="text-lg font-semibold text-slate-800">
            Your Response
          </h3>
          <p className="text-slate-500 text-sm">
            Speak or type your answer below
          </p>
        </div>

        <textarea
          onChange={(e) => setSpokenText(e.target.value)}
          value={spokenText}
          placeholder="Your answer will appear here..."
          className="w-full h-40 resize-none rounded-xl border border-slate-300 p-4 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Bottom Buttons */}
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          {isInterviewStarted ? <button
            className={`${buttonStyle} text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer shadow-md`}
            onClick={handleStartButton}
          >
            {buttonText}
          </button>:null}
          
        </div>

      </div>

    </div>

  </div>
)
}

export default NewInterview 