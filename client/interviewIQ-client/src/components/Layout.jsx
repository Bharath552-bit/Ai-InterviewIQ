import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {

    const location = useLocation()
    const isBarHidden = location.pathname=="/login" || location.pathname=="/signup"
  return (
    <div className='flex h-screen'>
        {!isBarHidden && <div className='border-1 w-36'>
            <Sidebar/>
        </div> }
        
        <div className='w-full'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout