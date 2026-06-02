import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

export const UserProvider = createContext()
function ContextProvider() {
    const [userDetails,setUserDetails] = useState({})

    useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem("user"))
        setUserDetails(userData)
    },[])
  return (
    <UserProvider.Provider value={{userDetails}}>
        <Outlet/>
    </UserProvider.Provider>
  )
}

export default ContextProvider