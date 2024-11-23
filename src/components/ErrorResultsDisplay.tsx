import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { ErrorCalculationResult } from '../types';
import { Tooltip } from './Tooltip';
import { Clock, DollarSign, UserCheck, Edit2 } from 'lucide-react';

interface ErrorResultsDisplayProps {
  result: ErrorCalculationResult;
  calculatorRef?: React.RefObject<HTMLDivElement>;
}

export function ErrorResultsDisplay({ result, calculatorRef }: ErrorResultsDisplayProps) {
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

  // Calculate per-user metrics
  const workingDaysPerYear = result.isFullTime ? 250 : 175;
  const annualHoursPerUser = result.dailyHours * workingDaysPerYear;
  const productivityDecimal = result.maxAchievableProductivity / 100;
  
  // Calculate hours based on productivity percentage
  const netProductiveHoursPerUser = annualHoursPerUser * productivityDecimal;
  const hoursLostPerUser = annualHoursPerUser - netProductiveHoursPerUser;
  const enterpriseHoursLost = hoursLostPerUser * result.employees;

  // Calculate value metrics
  const expectedAnnualValue = result.wage * 1.5;
  const actualValue = expectedAnnualValue * productivityDecimal;
  const valueImpactPerUser = actualValue - expectedAnnualValue;
  const enterpriseValueImpact = valueImpactPerUser * result.employees;
  const netAnnualValue = actualValue;

  const chartData = result.isHoursMode ? [
    {
      name: 'Expected\nAnnual Hours',
      value: annualHoursPerUser,
      color: '#3B82F6'
    },
    {
      name: 'Annual\nHours Lost',
      value: hoursLostPerUser,
      color: '#EF4444'
    },
    {
      name: 'Net Productive\nHours/Year',
      value: netProductiveHoursPerUser,
      color: '#10B981'
    }
  ] : [
    {
      name: 'Expected\nAnnual Value',
      value: expectedAnnualValue,
      color: '#3B82F6'
    },
    {
      name: 'Annual\nValue Lost',
      value: Math.abs(valueImpactPerUser),
      color: '#EF4444'
    },
    {
      name: 'Net Annual\nValue',
      value: netAnnualValue,
      color: '#10B981'
    }
  ];

  return (
    <div className="card p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-2xl text-sf-blue-700 flex items-center gap-2">
              Error Impact Analysis
              <div className="flex items-center gap-1">
                {result.isHoursMode ? <Clock className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
                <UserCheck className={`w-5 h-5 ${result.isFullTime ? 'text-sf-blue-500' : 'text-gray-400'}`} />
              </div>
            </h3>
            <p className="text-4xl font-bold text-sf-blue-500 mt-2">{result.maxAchievableProductivity.toFixed(1)}%</p>
            <p className="text-sf-blue-600">maximum achievable productivity</p>
            <p className="text-sf-blue-600">
              Interface: {result.interfaceName || 'Unnamed'} ({result.experience})
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Annual Errors</p>
              <p className="text-lg font-semibold">{result.annualErrors.toLocaleString()}</p>
              <p className="text-sm text-gray-500">
                ({Math.round(result.errorsPerUser)} per user)
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Distraction Time per Error</p>
              <p className="text-lg font-semibold">{result.distractionTimePerError} minutes</p>
            </div>
            
            {result.isHoursMode ? (
              <>
                <div>
                  <Tooltip content="Hours lost to error-related distractions per user annually">
                    <p className="text-sm font-medium text-gray-500">Annual Hours Lost per User</p>
                  </Tooltip>
                  <p className="text-lg font-semibold text-red-600">
                    {formatHours(hoursLostPerUser)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Net Productive Hours/Year per User</p>
                  <p className="text-lg font-semibold text-green-600">
                    {formatHours(netProductiveHoursPerUser)}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Tooltip content="The financial impact of productivity loss per user annually">
                    <p className="text-sm font-medium text-gray-500">Annual Value Impact per User</p>
                  </Tooltip>
                  <p className="text-lg font-semibold text-red-600">
                    {formatCurrency(valueImpactPerUser)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Productivity Loss</p>
                  <p className="text-lg font-semibold text-red-600">
                    {(100 - result.maxAchievableProductivity).toFixed(1)}%
                  </p>
                </div>
              </>
            )}

            <div>
              <p className="text-sm font-medium text-gray-500">Enterprise-wide Impact</p>
              <p className="text-lg font-semibold text-red-600">
                {result.isHoursMode 
                  ? `${formatHours(enterpriseHoursLost)} lost`
                  : formatCurrency(enterpriseValueImpact)
                }
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-3/5 h-[300px]">
          <h4 className="text-lg font-medium text-sf-blue-700 mb-4">Per-User Annual Impact</h4>
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