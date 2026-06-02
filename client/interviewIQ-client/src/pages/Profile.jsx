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
    <div className="relative min-h-screen bg-slate-50 p-6">

      {isChangeDetailsForm
        ? <PopUp
            setIsChangeDetailsForm={setIsChangeDetailsForm}
            RenderComponent={UpdateProfileForm}
          />
        : null
      }

      <div className="max-w-4xl mx-auto">

        <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">

              <div>
                <h1 className="text-3xl font-bold text-white">
                  Profile
                </h1>
                <p className="text-blue-100 mt-1">
                  Manage your personal information
                </p>
              </div>

              <button
                onClick={() => setIsChangeDetailsForm(true)}
                className="mt-4 md:mt-0 bg-white text-blue-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 cursor-pointer"
              >
                Edit Profile
              </button>

            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-sm text-slate-500 mb-1">
                  Full Name
                </p>
                <p className="text-lg font-semibold text-slate-800">
                  {userDetails.name || "N/A"}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-sm text-slate-500 mb-1">
                  Email Address
                </p>
                <p className="text-lg font-semibold text-slate-800 break-all">
                  {userDetails.email || "N/A"}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-sm text-slate-500 mb-1">
                  Age
                </p>
                <p className="text-lg font-semibold text-slate-800">
                  {userDetails.dob ? getAge(userDetails.dob) : "N/A"}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-sm text-slate-500 mb-1">
                  Phone Number
                </p>
                <p className="text-lg font-semibold text-slate-800">
                  {userDetails.phone || "N/A"}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
    
  )
}

export default Profile