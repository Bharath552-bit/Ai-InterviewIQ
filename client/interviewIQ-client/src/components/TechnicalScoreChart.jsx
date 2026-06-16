import React from 'react'
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

function TechnicalScoreChart() {

    const data = [
        {
            interview : 'interview-1',
            technicalScore : 5,
            date : '04/05/2026'
        },
        {
            interview : 'interview-2',
            technicalScore : 6,
            date : '05/05/2026'
        },
        {
            interview : 'interview-3',
            technicalScore : 4,
            date : '06/05/2026'
        },
        {
            interview : 'interview-4',
            technicalScore : 5,
            date : '07/05/2026'
        }
    ]
  return (
    <div >
        {/* <ResponsiveContainer width='100%' aspect={1.618} maxHeight={500}> */}

        <LineChart
            style={{ width: '100%', maxWidth: '700px',width : '40vw', height: '50vh', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date"  />
            <YAxis width="auto" domain ={[0,10]} />
            <Tooltip/>
            <Legend />
            <Line
                type="monotone"
                dataKey="technicalScore"
                // stroke="var(--color-chart-1)"
                // dot={{
                // fill: 'var(--color-surface-base)',
                // }}
                activeDot={{ r: 6 }}
            />
        </LineChart>

        {/* </ResponsiveContainer> */}
    </div>
  )
}

export default TechnicalScoreChart