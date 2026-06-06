import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../api-s/interceptors'

function Home() {
  const aiContentContainer = useRef()
  const [userText,setUserText] = useState("")

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
  return (
    <div>
        <form onSubmit={callingAi} className='flex justify-center gap-3 mt-3'>
          <textarea type="text" className='shadow-2xl w-80' placeholder='Ask ai' onChange={(e)=>setUserText(e.target.value)}></textarea>
          <input type="submit" className={`${!userText.length?"bg-blue-200":"bg-blue-400 cursor-pointer"} rounded-xl' value="Submit`} />
        </form>
        <div ref={aiContentContainer}>

        </div>
    </div>
  )
}

export default Home