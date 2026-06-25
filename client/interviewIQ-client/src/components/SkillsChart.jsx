import React from 'react'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from 'recharts'

function SkillsChart({ interviewData }) {

  if (!interviewData?.length) {
    return (
      <div className="h-[320px] flex items-center justify-center text-slate-500">
        No interview data available
      </div>
    )
  }

  const latestInterview = interviewData[interviewData.length - 1]

  const data = [
    {
      name: "Strong Areas",
      value: latestInterview.strongAreas?.length || 0,
      skills : latestInterview.strongAreas || []
    },
    {
      name: "Weak Areas",
      value: latestInterview.weakAreas?.length || 0,
      skills : latestInterview.weakAreas || []
    },
  ]

  const COLORS = ["#2563EB", "#EF4444"]

  const RADIAN = Math.PI / 180

  const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  }) => {
  if (
    cx == null ||
    cy == null ||
    innerRadius == null ||
    outerRadius == null
  ) {
    return null;
  }

  if (!percent || percent <= 0) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  const x =
    cx + radius * Math.cos((-midAngle * Math.PI) / 180);

  const y =
    cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      fontSize={14}
      fontWeight="600"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
    );
  };

  const MyCustomPie = (props) => {
    return (
      <Sector
        {...props}
        fill={COLORS[props.index % COLORS.length]}
      />
    )
  }

  const CustomTooltip = ({ active, payload }) => {

  if (!active || !payload || !payload.length) {
    return null;
  }

  const item = payload[0].payload;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-4 max-w-xs">

      <h3 className="font-semibold text-slate-800 mb-2">
        {item.name}
      </h3>

      <p className="text-sm text-slate-500 mb-3">
        Total: {item.value}
      </p>

      <div className="space-y-1">

        {item.skills.length > 0 ? (
          item.skills.map((skill, index) => (
            <div
              key={index}
              className="bg-slate-100 rounded-md px-2 py-1 text-sm text-slate-700"
            >
              • {skill}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No skills available
          </p>
        )}

      </div>

    </div>
    );
  };

  return (
    <div className="w-full h-[320px]">

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="45%"
            outerRadius={120}
            innerRadius={45}
            paddingAngle={3}
            label={renderCustomizedLabel}
            labelLine={false}
            shape={MyCustomPie}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{
              paddingTop: 20,
            }}
          />

        </PieChart>

      </ResponsiveContainer>

    </div>
  )
}

export default SkillsChart