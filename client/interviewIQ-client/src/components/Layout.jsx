import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {

    const location = useLocation()
    const token = localStorage.getItem("token")
    const isBarHidden = location.pathname=="/login" || location.pathname=="/signup" 
    || location.pathname == "/interview/live" || (location.pathname === "/" && !token)
  return (
    <div className='flex h-screen'>
        {!isBarHidden && <div className='w-[22%]'>
            <Sidebar/>
        </div> }
        
        <div className='w-full overflow-auto'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout