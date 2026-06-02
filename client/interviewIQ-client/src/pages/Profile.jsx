import axios from 'axios'
import React, { useContext, useState } from 'react'
import { UserProvider } from '../components/ContextProvider'
import moment from 'moment'
import PopUp from '../components/PopUp'
import UpdateProfileForm from '../components/UpdateProfileForm'

function Profile() {
  const {userDetails} = useContext(UserProvider)
  const [isChangeDetailsForm,setIsChangeDetailsForm] = useState(false)

  function getAge(dob){
    if(!dob) return null
    const age = moment().diff(dob,'years')

    return age
  }


  return (
    <div className='relative'>
      {isChangeDetailsForm?<PopUp setIsChangeDetailsForm={setIsChangeDetailsForm} RenderComponent={UpdateProfileForm}/>:null}
      <div className='border-1 h-40 w-full'>
        <header>
          <h1>Profile</h1>
        </header>
        <div className='flex justify-end' >
          <button onClick={()=>setIsChangeDetailsForm(true)} className='cursor-pointer'>Edit</button>
        </div>
        <div>
          <p>Name : {userDetails.name}</p>
          <p>Email : {userDetails.email}</p>
          <p>Age : {userDetails.dob ? getAge(userDetails.dob):"N/A"}</p>
          <p>Phone : {userDetails.phone}</p>
        </div>
      </div>
    </div>
    
  )
}

export default Profile