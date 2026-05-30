import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {

  const [userCredentials,setUserCredentials]=useState({email:"",password:""})

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
      localStorage.setItem("user",JSON.stringify(data.data.user))
      console.log(data)
    }catch(err){
      toast.error(err.response.data.message)
    }
  }
  return (
    <div>
        <form onSubmit={login}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" required name='email' id='email' value={userCredentials.email} onChange={updateLoginFormData} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" required name='password' id='password' value={userCredentials.password} onChange={updateLoginFormData} />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
    </div>
  )
}

export default Login