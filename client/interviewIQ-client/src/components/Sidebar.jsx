import React from 'react'
import { navItems } from '../utils/navItems'
import { Link, useNavigate } from 'react-router-dom'

function Sidebar() {

  const navigate = useNavigate()

  function logOut(){
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col justify-between shadow-sm">

      <div>

        <header className="px-6 py-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-blue-600">
            AI InterviewIQ
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Interview Preparation
          </p>
        </header>

        <nav className="mt-6 px-4">
          <ul className="space-y-2">

            {navItems.map((item) => {
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}

          </ul>
        </nav>

      </div>

      <div className="p-4 border-t border-slate-200">

        <button
          onClick={logOut}
          className="w-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 py-3 rounded-xl font-medium cursor-pointer transition-all duration-300"
        >
          Log Out
        </button>

      </div>

    </div>
  )
}

export default Sidebar