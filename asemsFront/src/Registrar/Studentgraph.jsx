import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';

const Studentgraph = () => {
  const studentData = [
    { year: '2024', students: 120 },
    { year: '2025', students: 150 },
    { year: '2026', students: 180 },
    { year: '2027', students: 200 },
    { year: '2028', students: 220 }
  ];

  return (
    <div style={{ 
      width: '100%', 
      height: '450px',
      padding: '20px'
    }}>
      <h3 style={{
        marginBottom: '24px',
        color: '#1e293b',
        fontSize: '1.6rem',
        fontWeight: 600,
        textAlign: 'center'
      }} className='text-primary'>
        Student Enrollment Growth (2024-2028)
      </h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <ComposedChart
          data={studentData}
          margin={{ top: 0, right: 20, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          
          <XAxis 
            dataKey="year"
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickMargin={10}
          />
          
          <YAxis 
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickMargin={10}
          />
          
          <Tooltip
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.98)',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              color: '#1e293b'
            }}
            itemStyle={{ color: '#4f46e5' }}
            labelStyle={{ fontWeight: 600 }}
          />
          
          <Area
            type="monotone"
            dataKey="students"
            fill="url(#areaFill)"
            stroke="none"
          />
          
          <Line
            type="monotone"
            dataKey="students"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{
              fill: '#ffffff',
              stroke: '#4f46e5',
              strokeWidth: 2,
              r: 5
            }}
            activeDot={{
              fill: '#ffffff',
              stroke: '#4f46e5',
              strokeWidth: 3,
              r: 7
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      
      <div style={{
        textAlign: 'center',
        marginTop: '16px',
        color: '#64748b',
        fontSize: '0.875rem'
      }}>
        <span style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          backgroundColor: '#4f46e5',
          borderRadius: '50%',
          marginRight: '8px'
        }}></span>
        Total Students Enrolled Each Academic Year
      </div>
    </div>
  );
};

export default Studentgraph;