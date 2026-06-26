import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { api } from '../api-s/interceptors'

export const UserProvider = createContext()
function ContextProvider() {
    const [userDetails,setUserDetails] = useState({})
    const [allInterviews,setAllInterviews] = useState([])
    const token = localStorage.getItem("token")

    async function getAllInterviews(){
      try{
        const apiData = await api.post("/interview/getInterview",{token})
        setAllInterviews(apiData.interview)
      }catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
      getAllInterviews()
      const userData = JSON.parse(localStorage.getItem("user"))
      setUserDetails(userData)
    },[])
  return (
    <UserProvider.Provider value={{userDetails,allInterviews}}>
        <Outlet/>
    </UserProvider.Provider>
  )
}

export default ContextProvider