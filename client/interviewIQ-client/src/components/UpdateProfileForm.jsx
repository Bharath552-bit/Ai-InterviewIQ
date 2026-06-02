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
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl">

            <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="text-2xl font-bold text-slate-800">
                    Update Profile
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                    Modify your personal information
                </p>
            </div>

            <form
                onSubmit={updateUser}
                className="p-6 space-y-5"
            >

                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700 mb-2"
                    >
                        Full Name
                    </label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={updatedDetails.name}
                        onChange={(e)=>updateValues(e.target.value,'name')}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                        type="date"
                        id="dob"
                        name="dob"
                        value={updatedDetails.dob}
                        onChange={(e)=>updateValues(e.target.value,'dob')}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                        type="text"
                        id="phone"
                        name="phone"
                        value={updatedDetails.phone}
                        onChange={(e)=>updateValues(e.target.value,'phone')}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300"
                    >
                        Update Profile
                    </button>
                </div>

            </form>

        </div>
    )
}

export default UpdateProfileForm