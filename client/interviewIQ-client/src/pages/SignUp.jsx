import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

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
        <div className="min-h-screen bg-slate-50 flex justify-center items-center px-4 py-8">

            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Create Account
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Join AI InterviewIQ and start your interview preparation journey
                    </p>
                </div>

                <form className="space-y-5" onSubmit={signUp}>

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Full Name
                        </label>

                        <input
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            type="text"
                            required
                            value={formValues.name}
                            name="name"
                            id="name"
                            placeholder="Enter your full name"
                            onChange={updateFormData}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Email Address
                        </label>

                        <input
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            type="email"
                            required
                            value={formValues.email}
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            onChange={updateFormData}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="dob"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Date of Birth
                        </label>

                        <input
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            type="date"
                            value={formValues.dob}
                            name="dob"
                            id="dob"
                            onChange={updateFormData}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Phone Number
                        </label>

                        <input
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            type="text"
                            required
                            name="phone"
                            value={formValues.phone}
                            id="phone"
                            placeholder="Enter your phone number"
                            onChange={updateFormData}
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
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            type="password"
                            required
                            value={formValues.password}
                            name="password"
                            id="password"
                            placeholder="Create a password"
                            onChange={updateFormData}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Confirm Password
                        </label>

                        <input
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            type="password"
                            required
                            value={formValues.confirmPassword}
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            onChange={updateFormData}
                        />
                    </div>

                    <div className="pt-2">
                        <input
                            type="submit"
                            value="Create Account"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300"
                        />
                    </div>

                </form>

                <div className="mt-6 text-center">
                    <p className="text-slate-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Login
                        </Link>
                    </p>
                </div>

            </div>

        </div>
    )
}

export default SignUp