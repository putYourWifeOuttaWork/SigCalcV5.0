import React from 'react';
import { CalculationResult } from '../types';
import { BarChart as BarChartIcon } from 'lucide-react';
import { ProductivityChart } from './ProductivityChart';

interface Props {
  result: CalculationResult;
}

export function RoleResults({ result }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <BarChartIcon className="text-blue-500" />
        Analysis Results
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Productivity</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-2xl font-bold text-blue-600">
                  {result.productivityPercentage.toFixed(1)}%
                </span>
                <span className="text-sm text-gray-500">of expected</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${Math.min(100, result.productivityPercentage)}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Value vs Expected</p>
              <p className="text-2xl font-bold text-green-600">
                ${result.trueLaborCost.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Per employee
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Role Impact</p>
              <p className={`text-2xl font-bold ${
                result.totalRoleValue >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${result.totalRoleValue.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Across {result.numberOfEmployees} employees
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Tasks Per Day</p>
              <p className="text-lg font-semibold">
                {result.actualTasksPerDay.toFixed(1)} / {result.tasksPerDay}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Max Clicks/Day</p>
              <p className="text-lg font-semibold">
                {result.maxClicksPerDay.toFixed(0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Expected Value</p>
              <p className="text-lg font-semibold">
                ${result.expectedValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:border-l lg:pl-6">
          <ProductivityChart result={result} />
        </div>
      </div>
    </div>
  );
}