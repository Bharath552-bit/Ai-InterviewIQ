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
      <div className='flex flex-col'>
        <header>
          <h1>Ai-InterviewIQ</h1>
        </header>
        <ul className='pl-3 mt-5'>
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
      </div>
      <div>
        <button onClick={logOut} className='cursor-pointer'>Log Out</button>
      </div>
    </div>
  )
}

export default Sidebar