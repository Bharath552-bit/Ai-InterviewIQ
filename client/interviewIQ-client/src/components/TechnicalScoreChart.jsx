import React, { useContext } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis, 
} from 'recharts'
import moment from 'moment'
import { UserProvider } from './ContextProvider'

function TechnicalScoreChart() {

  const {allInterviews} = useContext(UserProvider)

  if (!allInterviews?.length) {
    return (
      <div className="h-[320px] flex items-center justify-center text-slate-500">
        No interview data available
      </div>
    )
  }

  const data = allInterviews.map((interview) => ({
    technicalScore: interview.technicalScore,
    date: moment(interview.startedAt).format("DD MMM")
  }))

  return (
    <div className="w-full h-[320px]">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#E2E8F0"
          />

          <XAxis
            dataKey="date"
            tick={{ fill: "#64748B", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fill: "#64748B", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #CBD5E1",
              boxShadow: "0 10px 25px rgba(0,0,0,.08)"
            }}
          />

          <Legend
            wrapperStyle={{
              paddingTop: 10
            }}
          />

          <Line
            type="monotone"
            dataKey="technicalScore"
            name="Technical Score"
            stroke="#2563EB"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#2563EB",
              stroke: "#ffffff",
              strokeWidth: 2
            }}
            activeDot={{
              r: 8,
              fill: "#2563EB"
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  )
}

export default TechnicalScoreChart