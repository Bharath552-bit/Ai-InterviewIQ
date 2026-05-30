import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function AuthProtectedLayout() {
    const userCredentials = localStorage.getItem("user")
    if(!userCredentials){
        return <Navigate to="/login"/>
    }
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default AuthProtectedLayout