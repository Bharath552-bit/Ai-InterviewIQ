import React, { useContext, useEffect, useState } from 'react'
import TechnicalScoreChart from '../components/TechnicalScoreChart'
import SkillsChart from '../components/SkillsChart'
import InterviewHistoryTable from '../components/InterviewHistoryTable'
import axios from 'axios'
import { api } from '../api-s/interceptors'
import { UserProvider } from '../components/ContextProvider'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  return (
  <div className="min-h-screen bg-slate-50 p-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Track your interview performance and monitor your progress.
        </p>
      </div>

      <button
        className="mt-4 md:mt-0 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={()=>navigate("interview/setup")}
      >
        New Interview
      </button>

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

        <TechnicalScoreChart/>

      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5">

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Skills Distribution
          </h2>
          <p className="text-sm text-slate-500">
            Breakdown of skills based on your latest interview
          </p>
        </div>

        <SkillsChart/>

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