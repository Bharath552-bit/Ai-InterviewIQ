import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Illustration from "../assets/Illustration.png"

function SignUp() {
    const [formValues,setFromValues]=useState({name : "", email :"", dob : "", phone : "", password : "", confirmPassword : ""})

    const navigate = useNavigate()

    function updateFormData(e){
        const {name,value}=e.target

        const updatedFormValues={...formValues}

        updatedFormValues[name]=value

        if(name=="phone" && value.length>10){
            console.log("wrong format")
            return
        }

        setFromValues(updatedFormValues)
    }

    async function signUp(e){
        e.preventDefault()

        if(formValues.password !== formValues.confirmPassword) {
            toast("Password does not match",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return
        }

        const body={
            name:formValues.name,
            dob:formValues.dob,
            email:formValues.email,
            phone:formValues.phone,
            password:formValues.password
        }

        try{
            const data = await axios.post("http://localhost:4000/auth/signup",body)
            console.log(data,' data from signup')
            navigate("/login")

        }catch(err){
            console.log(err.message)
            toast.error(err.message)
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

                    Start Your Journey

                </h2>

                <p className="mt-5 text-blue-100 leading-7 max-w-md">

                    Create your AI InterviewIQ account and start practicing
                    technical interviews with personalized AI feedback,
                    performance tracking and career-focused guidance.

                </p>

            </div>

            {/* Features */}

            <div className="mt-10 w-full max-w-md space-y-5">

                <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-white/15 flex justify-center items-center">

                        🚀

                    </div>

                    <span className="text-white">

                        Unlimited AI Interview Practice

                    </span>

                </div>

                <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-white/15 flex justify-center items-center">

                        💡

                    </div>

                    <span className="text-white">

                        Personalized AI Feedback

                    </span>

                </div>

                <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-white/15 flex justify-center items-center">

                        💼

                    </div>

                    <span className="text-white">

                        Build Interview Confidence

                    </span>

                </div>

            </div>

            <p className="mt-10 text-cyan-200 text-lg italic font-medium">

                "Every great software engineer starts with one interview."

            </p>

        </div>

    </div>

    {/* RIGHT SIDE */}

    <div className="w-full lg:w-1/2 h-screen overflow-y-auto">

        <div className="min-h-full flex justify-center py-10 px-8">

            <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-slate-800">

                        Create Account

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Join AI InterviewIQ and begin your interview preparation journey.

                    </p>

                </div>

                <form
                    onSubmit={signUp}
                    className="space-y-5"
                >

                    {/* Name */}

                    <div>

                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-slate-700"
                        >

                            Full Name

                        </label>

                        <input
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            type="text"
                            required
                            value={formValues.name}
                            name="name"
                            id="name"
                            placeholder="Enter your full name"
                            onChange={updateFormData}
                        />

                    </div>

                    {/* Email */}

                    <div>

                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-slate-700"
                        >

                            Email Address

                        </label>

                        <input
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            type="email"
                            required
                            value={formValues.email}
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            onChange={updateFormData}
                        />

                    </div>
                                        {/* Date of Birth */}

                    <div>

                        <label
                            htmlFor="dob"
                            className="block mb-2 text-sm font-medium text-slate-700"
                        >

                            Date of Birth

                        </label>

                        <input
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            type="date"
                            value={formValues.dob}
                            name="dob"
                            id="dob"
                            onChange={updateFormData}
                        />

                    </div>

                    {/* Phone Number */}

                    <div>

                        <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-slate-700"
                        >

                            Phone Number

                        </label>

                        <input
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            type="text"
                            required
                            name="phone"
                            id="phone"
                            value={formValues.phone}
                            placeholder="Enter your phone number"
                            onChange={updateFormData}
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
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            type="password"
                            required
                            value={formValues.password}
                            name="password"
                            id="password"
                            placeholder="Create a strong password"
                            onChange={updateFormData}
                        />

                    </div>
                                        {/* Confirm Password */}

                    <div>

                        <label
                            htmlFor="confirmPassword"
                            className="block mb-2 text-sm font-medium text-slate-700"
                        >

                            Confirm Password

                        </label>

                        <input
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            type="password"
                            required
                            value={formValues.confirmPassword}
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            onChange={updateFormData}
                        />

                    </div>

                    {/* Submit Button */}

                    <input
                        type="submit"
                        value="Create Account"
                        className="w-full cursor-pointer rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                    />

                </form>

                {/* Divider */}

                <div className="my-7 flex items-center">

                    <div className="flex-1 h-px bg-slate-200"></div>

                    <span className="px-4 text-sm text-slate-400">

                        OR

                    </span>

                    <div className="flex-1 h-px bg-slate-200"></div>

                </div>

                {/* Login Link */}

                <div className="text-center">

                    <p className="text-slate-600">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >

                            Sign In

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    </div>

</div>
)
}

export default SignUp