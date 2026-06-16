import React from 'react'
import TechnicalScoreChart from '../components/TechnicalScoreChart'
import SkillsChart from '../components/SkillsChart'
import InterviewHistoryTable from '../components/InterviewHistoryTable'

function Dashboard() {
  return (
    <div className='flex flex-col justify-between h-screen'>
      {/* charts */}
      <div className='flex border h-full '>
        
        <TechnicalScoreChart/>

        <SkillsChart/>

      </div>

      {/* table */}
      <div className='h-full border'>

        <InterviewHistoryTable/>

      </div>
    </div>
  )
}

export default Dashboard