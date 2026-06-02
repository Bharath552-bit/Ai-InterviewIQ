import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {

  const [userCredentials,setUserCredentials]=useState({email:"",password:""})
  const navigate = useNavigate()

  function updateLoginFormData(e){
    const {name,value}=e.target

    const updatedUserCredentails={...userCredentials}

    updatedUserCredentails[name]=value

    setUserCredentials(updatedUserCredentails)
  }

  async function login(e){
    e.preventDefault()

    try{
      const data=await axios.post("http://localhost:4000/auth/login",userCredentials)
      localStorage.setItem("token",data.data.message)
      localStorage.setItem("user",JSON.stringify(data.data.userDetails))
      console.log(data.data.userDetails)
      navigate("/")
    }catch(err){
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome Back
          </h1>
          <p className="text-slate-500 mt-2">
            Sign in to continue to AI InterviewIQ
          </p>
        </div>

        <form onSubmit={login} className="space-y-5">

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Email Address
            </label>

            <input
              type="email"
              required
              name="email"
              id="email"
              value={userCredentials.email}
              onChange={updateLoginFormData}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Password
            </label>

            <input
              type="password"
              required
              name="password"
              id="password"
              value={userCredentials.password}
              onChange={updateLoginFormData}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <input
              type="submit"
              value="Sign In"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300"
            />
          </div>

          <div className="text-center">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login