import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {

    const location = useLocation()
    const isBarHidden = location.pathname=="/login" || location.pathname=="/signUp"
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