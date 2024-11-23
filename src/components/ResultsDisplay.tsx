import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { CalculationResult } from '../types';
import { Tooltip } from './Tooltip';
import { Clock, DollarSign, UserCheck, Edit2 } from 'lucide-react';

interface ResultsDisplayProps {
  result: CalculationResult;
  showChart?: boolean;
  calculatorRef?: React.RefObject<HTMLDivElement>;
}

export function ResultsDisplay({ result, showChart = true, calculatorRef }: ResultsDisplayProps) {
  const handleEditClick = () => {
    if (calculatorRef?.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatHours = (value: number) => {
    return `${value.toFixed(1)} hrs`;
  };

  const chartData = result.isHoursMode ? [
    {
      name: 'Expected\nAnnual Hours',
      value: (result.hoursPerDay || 0) * (result.workingDaysPerYear || 250),
      color: '#3B82F6'
    },
    {
      name: 'Actual\nAnnual Hours',
      value: ((result.productivity / 100) * (result.hoursPerDay || 0)) * (result.workingDaysPerYear || 250),
      color: result.productivity >= 100 ? '#10B981' : '#8B5CF6'
    },
    {
      name: 'Hours\nDifference',
      value: (result.hoursDifference || 0) * (result.workingDaysPerYear || 250),
      color: result.hoursDifference && result.hoursDifference >= 0 ? '#10B981' : '#EF4444'
    }
  ] : [
    {
      name: 'Average\nWage',
      value: result.cost,
      color: '#3B82F6'
    },
    {
      name: 'Value\nProduced',
      value: result.valueProduced,
      color: result.valueProduced >= result.expectedValue ? '#10B981' : '#8B5CF6'
    },
    {
      name: 'Cost/\nBenefit',
      value: result.trueCost,
      color: result.trueCost >= 0 ? '#10B981' : '#EF4444'
    }
  ];

  return (
    <div className="card p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-2xl text-sf-blue-700 flex items-center gap-2">
              Productivity Analysis
              <div className="flex items-center gap-1">
                {result.isHoursMode ? <Clock className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
                <UserCheck className={`w-5 h-5 ${result.isFullTime ? 'text-sf-blue-500' : 'text-gray-400'}`} />
              </div>
            </h3>
            <p className="text-4xl font-bold text-sf-blue-500 mt-2">{result.productivity.toFixed(1)}%</p>
            <p className="text-sf-blue-600">of expected productivity</p>
            <p className="text-sf-blue-600">
              Experience Level: {result.experience} ({result.isFullTime ? 'Full-Time' : 'Part-Time'})
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Tasks Per Day</p>
              <p className="text-lg font-semibold">{result.tasksPerDay} / {result.expectedTasks}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Max Clicks/Day</p>
              <p className="text-lg font-semibold">{result.maxClicksPerDay.toFixed(0)}</p>
            </div>
            
            {result.isHoursMode ? (
              <>
                <div>
                  <Tooltip content="The difference between expected and actual hours per day based on EPT impact">
                    <p className="text-sm font-medium text-gray-500">Daily Hours Impact</p>
                  </Tooltip>
                  <p className={`text-lg font-semibold ${result.hoursDifference && result.hoursDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatHours(result.hoursDifference || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Annual Hours Impact ({result.workingDaysPerYear} days)
                  </p>
                  <p className={`text-lg font-semibold ${result.annualHoursDifference && result.annualHoursDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatHours((result.annualHoursDifference || 0) * result.employees)}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Tooltip content="At the EPT submitted, this number represents the estimated dollar value of the net cost (or benefit) of an employee given their productivity as a percentage of the employer's total amount paid.">
                    <p className="text-sm font-medium text-gray-500">True Labor Cost</p>
                  </Tooltip>
                  <p className={`text-lg font-semibold ${result.trueCost >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(result.trueCost)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Net Combined Role Value</p>
                  <p className={`text-lg font-semibold ${result.totalRoleValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(result.totalRoleValue)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="md:w-3/5 h-[300px]">
          <h4 className="text-lg font-medium text-sf-blue-700 mb-4">Impact Visualization</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 80, right: 20, top: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                tickFormatter={(value) => result.isHoursMode ? formatHours(value) : formatCurrency(value)} 
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={80}
                tick={{ 
                  fontSize: 12,
                  fontWeight: 600,
                  fill: '#374151',
                  dy: 0
                }}
              />
              <RechartsTooltip 
                formatter={(value: number) => [
                  result.isHoursMode ? formatHours(value) : formatCurrency(value),
                  ''
                ]}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}
              />
              <Bar 
                dataKey="value" 
                fill="#3B82F6"
                radius={[0, 4, 4, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t flex justify-center">
        <button
          onClick={handleEditClick}
          className="btn-secondary"
        >
          <Edit2 size={16} className="mr-2" />
          Edit Calculation
        </button>
      </div>
    </div>
  );
}