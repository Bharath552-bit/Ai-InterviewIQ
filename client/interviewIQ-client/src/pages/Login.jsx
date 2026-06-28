import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Illustration from "../assets/Illustration.png";

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
      localStorage.setItem("token",data.data.token)
      localStorage.setItem("user",JSON.stringify(data.data.userDetails))
      console.log(data.data.userDetails)
      navigate("/")
    }catch(err){
      toast.error(err.response.data.message)
    }
  }

  return (
<div className="h-screen flex bg-slate-100 overflow-hidden">

    {/* LEFT SIDE */}

    <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">

        <div className="flex flex-col justify-center items-center w-full px-14">

            {/* Logo */}

            <div className="flex items-center gap-4 mb-10">

                <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex justify-center items-center">

                    🤖

                </div>

                <div>

                    <h1 className="text-3xl font-bold text-white">

                        AI InterviewIQ

                    </h1>

                    <p className="text-blue-100">

                        AI Powered Interview Platform

                    </p>

                </div>

            </div>

            {/* Illustration */}

            <img
                src={Illustration}
                alt="AI InterviewIQ"
                className="w-[280px] object-contain mb-10"
            />

            {/* Heading */}

            <div className="text-center">

                <h2 className="text-4xl font-bold text-white leading-tight">

                    Welcome Back

                </h2>

                <p className="mt-5 text-blue-100 leading-7 max-w-md">

                    Continue practicing technical interviews with your
                    personal AI interviewer and improve your confidence
                    before the real interview.

                </p>

            </div>

            {/* Features */}

            <div className="mt-10 w-full max-w-md space-y-5">

                <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                        🎤

                    </div>

                    <span className="text-white">

                        Practice AI-powered interviews

                    </span>

                </div>

                <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                        🤖

                    </div>

                    <span className="text-white">

                        Receive instant AI feedback

                    </span>

                </div>

                <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                        📈

                    </div>

                    <span className="text-white">

                        Track your interview progress

                    </span>

                </div>

            </div>

            <p className="mt-10 text-cyan-200 text-lg italic font-medium">

                "Prepare today. Succeed tomorrow."

            </p>

        </div>

    </div>

    {/* RIGHT SIDE */}

    <div className="w-full lg:w-1/2 flex justify-center items-center p-8">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

            <div className="text-center mb-8">

                <h1 className="text-4xl font-bold text-slate-800">

                    Sign In

                </h1>

                <p className="mt-2 text-slate-500">

                    Welcome back to AI InterviewIQ

                </p>

            </div>

            <form
                onSubmit={login}
                className="space-y-6"
            >

                {/* Email */}

                <div>

                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-slate-700"
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
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />

                </div>
                                {/* Password */}

                <div>

                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-slate-700"
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
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Forgot Password */}

                <div className="flex justify-end">

                    <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                    >
                        Forgot Password?
                    </button>

                </div>

                {/* Submit */}

                <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                />

            </form>

            {/* Divider */}

            <div className="my-7 flex items-center">

                <div className="h-px flex-1 bg-slate-200"></div>

                <span className="px-4 text-sm text-slate-400">

                    OR

                </span>

                <div className="h-px flex-1 bg-slate-200"></div>

            </div>

            {/* Signup */}

            <div className="text-center">

                <p className="text-slate-600">

                    Don't have an account?{" "}

                    <Link
                        to="/signup"
                        className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                    >

                        Create Account

                    </Link>

                </p>

            </div>

        </div>

    </div>

</div>
)
}

export default Login