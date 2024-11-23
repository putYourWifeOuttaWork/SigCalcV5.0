import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalculationResult } from '../types';

interface Props {
  results: CalculationResult[];
}

function generateEPTData() {
  const data = [];
  const EXPERTISE_MULTIPLIERS = {
    'Beginner': 0.20,
    'Seasoned': 0.25,
    'Expert': 0.30
  };

  for (let ept = 0.3; ept <= 4.0; ept += 0.1) {
    const point: any = { ept: ept.toFixed(1) };
    
    Object.entries(EXPERTISE_MULTIPLIERS).forEach(([experience, multiplier]) => {
      const theoreticalMax = 60 / ept;
      const x = theoreticalMax * multiplier;
      const y = Math.log(2 / ept) + x;
      point[experience] = Math.max(0, y);
    });
    
    data.push(point);
  }
  return data;
}

export function ProductivityChart({ results }: Props) {
  const [chartKey, setChartKey] = useState(0);
  const data = generateEPTData();
  
  const dotColors = {
    'Beginner': '#ff4d4f',
    'Seasoned': '#faad14',
    'Expert': '#52c41a'
  };

  useEffect(() => {
    setChartKey(prev => prev + 1);
  }, [results]);

  // Group calculation points by experience level
  const calculationsByExperience = results.reduce((acc, result) => {
    if (!result?.maxClicksPerDay) return acc;
    
    const clicksPerMinute = result.maxClicksPerDay / 360;
    const ept = Number((result.maxClicksPerDay / 360).toFixed(1));
    
    if (!acc[result.experience]) {
      acc[result.experience] = [];
    }
    
    acc[result.experience].push({
      ept,
      clicksPerMinute,
      experience: result.experience
    });
    
    return acc;
  }, {} as Record<string, Array<{ept: number, clicksPerMinute: number, experience: string}>>);

  // Custom dot renderer for each line
  const renderDot = (experience: string) => (props: any) => {
    if (!props?.cx || !props?.cy || !props?.payload) return null;
    
    const { cx, cy, payload } = props;
    const points = calculationsByExperience[experience] || [];
    
    if (points.some(p => Number(p.ept.toFixed(1)) === Number(payload.ept))) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill={dotColors[experience as keyof typeof dotColors]}
          stroke="#fff"
          strokeWidth={2}
        />
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full" key={chartKey}>
      <div className="flex flex-col items-center mb-8">
        <h4 className="text-lg font-medium text-gray-700 mb-4">
          Productivity Exponential Decay - Effect of EPT on Experience Levels
        </h4>
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#ff4d4f]" />
            <span className="text-sm">Beginner User @ EPT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#faad14]" />
            <span className="text-sm">Average User @ EPT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#52c41a]" />
            <span className="text-sm">Expert User @ EPT</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="ept" 
            label={{ 
              value: 'Tasks Capacity/Minute (by EPT)', 
              position: 'bottom',
              offset: 5
            }}
          />
          <YAxis
            label={{
              value: 'Amount of Tasks Done/Min',
              angle: -90,
              position: 'insideLeft',
              offset: 10
            }}
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(2)} tasks/min`, '']}
            labelFormatter={(ept) => `EPT: ${ept}s`}
          />
          <Line
            type="monotone"
            dataKey="Beginner"
            stroke="#ff4d4f"
            strokeWidth={2}
            dot={renderDot('Beginner')}
          />
          <Line
            type="monotone"
            dataKey="Seasoned"
            stroke="#faad14"
            strokeWidth={2}
            dot={renderDot('Seasoned')}
          />
          <Line
            type="monotone"
            dataKey="Expert"
            stroke="#52c41a"
            strokeWidth={2}
            dot={renderDot('Expert')}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}