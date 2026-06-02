import React, { useContext, useState } from 'react'
import { UserProvider } from './ContextProvider'
import axios from 'axios'

function UpdateProfileForm() {
    const {userDetails} = useContext(UserProvider)
    const [updatedDetails,setUpdatedDetails]=useState(userDetails)

    function updateValues(value,keyName){
        const newData={...updatedDetails}

        newData[keyName]=value

        setUpdatedDetails(newData)
    }

    async function updateUser(e){
        e.preventDefault()

        const updatedRecords={}

        for(let key in userDetails){
            if(userDetails[key] != updatedDetails[key]) updatedDetails[key] = updatedDetails.key
        }

        try{
            const data = await axios.patch(`http://localhost:4000/user/updateUser`,updatedRecords)
        }catch(err){
            console.log(err.message)
            toast.error(err.message)
        }
    }
  return (
    <div>
        <form onSubmit={updateUser} className='flex flex-col'>
            <div>
                <label htmlFor="name">Name :</label>
                <input type="text" id='name' name='name' value={updatedDetails.name} onChange={(e)=>updateValues(e.target.value,'name')}  />
            </div>
            <div>
                <label htmlFor="dob">Dob :</label>
                <input type="date" id='dob' name='dob' value={updatedDetails.dob} onChange={(e)=>updateValues(e.target.value,'dob')} />
            </div>
            <div>
                <label htmlFor="phone">Phone :</label>
                <input type="text" id='phone' name='phone' value={updatedDetails.phone} onChange={(e)=>updateValues(e.target.value,'phone')} />
            </div>
            <div>
                <button type='submit' className='cursor-pointer'>Update</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateProfileForm