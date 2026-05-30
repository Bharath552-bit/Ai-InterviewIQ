import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedLayout() {

    const userCredentials=localStorage.getItem("user")
    if(userCredentials){
        return <Navigate to="/"/>
    }
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default ProtectedLayout