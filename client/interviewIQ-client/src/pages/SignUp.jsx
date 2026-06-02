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
            const data =  await axios.post("http://localhost:4000/auth/signup",body)
            console.log(data,' data from signup')
            navigate("/login")

        }catch(err){
            console.log(err.message)
            toast.error(err.message)
        }


    }
  return (
    <div className='h-screen flex justify-center items-center'>
        <form className='flex gap-3 flex-col' onSubmit={signUp} >
            <div>
                <label htmlFor="name"> Name </label>
                <input className='border-1' type="text" required value={formValues.name}  name='name' id='name'  onChange={updateFormData} />
            </div>
            <div>
                <label htmlFor="email"> Email </label>
                <input className='border-1' type="email" required value={formValues.email} name='email' id='email' onChange={updateFormData}  />
            </div>
            <div>
                <label htmlFor="dob"> Dob </label>
                <input className='border-1' type="date" value={formValues.dob} name='dob' id='dob' onChange={updateFormData}  />
            </div>  <div>
                <label htmlFor="phone"> Phone </label>
                <input className='border-1' type="text" required name='phone' value={formValues.phone} id='phone'  onChange={updateFormData}  />
            </div>
            <div>
                <label htmlFor="password"> Password </label>
                <input className='border-1' type="password" required value={formValues.password} name='password' id='password' onChange={updateFormData}  />
            </div>
            <div>
                <label htmlFor="confirmPassword"> Confirm Password </label>
                <input className='border-1' type="password" required value={formValues.confirmPassword} name='confirmPassword' id='confirmPassword' onChange={updateFormData}  />
            </div>


            <div>
                <input type="submit" value="Submit" />
            </div>
        </form>
        <Link to="/login">Login</Link>
    </div>
  )
}

export default SignUp