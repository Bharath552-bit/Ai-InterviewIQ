import React from 'react'

function PopUp({setIsChangeDetailsForm,RenderComponent}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">

        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50">

          <h2 className="text-lg font-semibold text-slate-800">
            Edit Profile
          </h2>

          <button
            onClick={() => setIsChangeDetailsForm(false)}
            className="h-9 w-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all duration-200 cursor-pointer"
          >
            ✕
          </button>

        </div>

        <div className="p-1">
          <RenderComponent />
        </div>

      </div>

    </div>
  )
}

export default PopUp