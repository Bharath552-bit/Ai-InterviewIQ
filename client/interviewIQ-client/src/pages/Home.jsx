import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../api-s/interceptors'
import socket from '../interviewSocket'
import { startListening, stopListening, textToSpeech } from '../utils/speech'

function Home() {
  const aiContentContainer = useRef()
  const [userText,setUserText] = useState("")
  const [spokenText,setSpokenText] = useState("")

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
    socket.emit("first-message",{message:"Lets start the interview"})

    socket.on("first-response",(data)=>{
      console.log(data)
      if(data.message){
        textToSpeech(data.message)
      }
      socket.emit("second-message",{message:"Give me the first question"})
    })
    
    socket.on("second-response",(data)=>{
      console.log(data)
    })
  }

  useEffect(()=>{
    socket.connect()
  },[])
  return (
    <div>
        <form onSubmit={callingAi} className='flex justify-center gap-3 mt-3'>
          <textarea type="text" className='shadow-2xl w-80' placeholder='Ask ai' onChange={(e)=>setUserText(e.target.value)}></textarea>
          <input type="submit" className={`${!userText.length?"bg-blue-200":"bg-blue-400 cursor-pointer"} rounded-xl' value="Submit`} />
        </form>
        <div className='flex justify-center gap-5 '>
          <button onClick={()=>startListening(setSpokenText)} className='bg-blue-400 w-12 h-10 cursor-pointer rounded-xl'>Start</button>
          <button onClick={stopListening} className='bg-blue-400 w-12 h-10 cursor-pointer rounded-xl'>Stop</button>
        </div>
        <button onClick={startInterview}>Start Interview</button>

        <textarea value={spokenText} onChange={(e)=>setSpokenText(e.target.value)}></textarea>
        <div ref={aiContentContainer}>

        </div>
    </div>
  )
}

export default Home