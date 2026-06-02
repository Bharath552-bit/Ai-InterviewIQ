import React from 'react'

function PopUp({setIsChangeDetailsForm,RenderComponent}) {
  return (
    <div className='absolute bg-white h-[400px] w-[400px] shadow-2xl flex left-[25%]'>
        <div className='w-full'>
            <div className='flex justify-end'>
                <button onClick={()=>setIsChangeDetailsForm(false)}>Close</button>
            </div>
            <div>
                <RenderComponent/>
            </div>
        </div>
    </div>
  )
}

export default PopUp
