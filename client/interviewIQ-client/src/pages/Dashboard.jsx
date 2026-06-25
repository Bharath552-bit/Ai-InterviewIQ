import React, { useEffect, useState } from 'react'
import TechnicalScoreChart from '../components/TechnicalScoreChart'
import SkillsChart from '../components/SkillsChart'
import InterviewHistoryTable from '../components/InterviewHistoryTable'
import axios from 'axios'
import { api } from '../api-s/interceptors'

function Dashboard() {
  const [interviewData,setInterviewData] = useState([])
  const token = localStorage.getItem("token")

  if(!token){
    return
  }

  async function gettingInterviewData(){
    const apiData = await api.post("/interview/getInterview",{token})
    setInterviewData(apiData.interview)
  }

  useEffect(()=>{
    gettingInterviewData()
  },[])
  return (
  <div className="min-h-screen bg-slate-50 p-6">
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-slate-800">
        Dashboard
      </h1>
      <p className="text-slate-500 mt-1">
        Track your interview performance and monitor your progress.
      </p>
    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5">

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Technical Score
          </h2>
          <p className="text-sm text-slate-500">
            Performance across your interview attempts
          </p>
        </div>

        <TechnicalScoreChart interviewData={interviewData} />

      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5">

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Skills Distribution
          </h2>
          <p className="text-sm text-slate-500">
            Breakdown of your interview skills
          </p>
        </div>

        <SkillsChart interviewData={interviewData} />

      </div>

    </div>

    {/* History Table */}
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5">

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Interview History
        </h2>
        <p className="text-sm text-slate-500">
          View latest given interviews.
        </p>
      </div>

      <InterviewHistoryTable />

    </div>

  </div>
  )
}

export default Dashboard