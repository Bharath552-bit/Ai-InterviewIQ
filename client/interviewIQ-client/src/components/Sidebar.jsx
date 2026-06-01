import React from 'react'
import { navItems } from '../utils/navItems'
import { Link, useNavigate } from 'react-router-dom'

function Sidebar() {

  const navigate = useNavigate()

  function logOut(){
    localStorage.clear()
    navigate("/login")
  }
  return (
    <div className='flex flex-col justify-between h-screen'>
      <header>
        <h1>Ai-InterviewIQ</h1>
      </header>
      <ul>
        <nav>
          {
        navItems.map((item)=>{
          return <li key={item.path}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        })
      }
        </nav>
      </ul>
      <div>
        <button className='cursor-pointer'>Log Out</button>
      </div>
    </div>
  )
}

export default Sidebar