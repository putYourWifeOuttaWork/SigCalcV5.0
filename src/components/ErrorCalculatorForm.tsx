import React, { useState, useRef } from 'react';
import { Tooltip } from './Tooltip';
import { Trash2, Clock, DollarSign, UserCheck } from 'lucide-react';
import { Switch } from '@headlessui/react';
import { ErrorCalculationResult, DISTRACTION_MINUTES } from '../types';

interface ErrorCalculatorFormProps {
  onCalculate: (result: ErrorCalculationResult) => void;
  onDelete?: () => void;
  formIndex: number;
  resultsRef?: React.RefObject<HTMLDivElement>;
  previousValues?: ErrorCalculationResult;
}

export function ErrorCalculatorForm({ 
  onCalculate, 
  onDelete, 
  formIndex,
  resultsRef,
  previousValues
}: ErrorCalculatorFormProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const [interfaceName, setInterfaceName] = useState('');
  const [experience, setExperience] = useState<'Beginner' | 'Seasoned' | 'Expert'>('Seasoned');
  const [wage, setWage] = useState(previousValues?.wage.toString() || '45000');
  const [dailyHours, setDailyHours] = useState('7');
  const [isFullTime, setIsFullTime] = useState(true);
  const [isHoursMode, setIsHoursMode] = useState(false);
  const [weeklyErrors, setWeeklyErrors] = useState(previousValues?.weeklyErrors.toString() || '300');
  const [employees, setEmployees] = useState(previousValues?.employees.toString() || '1000');

  const handleNumberInput = (value: string, setter: (value: string) => void) => {
    if (value === '' || /^\d+$/.test(value)) {
      setter(value);
    }
  };

  const handleCalculate = () => {
    const annualErrors = Number(weeklyErrors) * 52;
    const errorsPerUser = annualErrors / Number(employees);
    const distractionTimePerError = DISTRACTION_MINUTES[experience];
    const workingDays = isFullTime ? 250 : 175;
    const standardHoursPerDay = 8;
    const annualWorkHours = Number(dailyHours) * workingDays;
    
    const totalDistractionMinutes = annualErrors * distractionTimePerError;
    const totalDistractionHours = totalDistractionMinutes / 60;
    const distractionHoursPerUser = totalDistractionHours / Number(employees);
    
    const netProductiveTime = annualWorkHours - distractionHoursPerUser;
    const productivityLoss = (distractionHoursPerUser / annualWorkHours) * 100;
    const maxAchievableProductivity = 100 - productivityLoss;
    
    const expectedAnnualHours = annualWorkHours;
    const maxAchievableHours = netProductiveTime;
    const errorImpactHours = -distractionHoursPerUser;
    
    const wageNum = Number(wage);
    const trueLaborCost = (wageNum * (maxAchievableProductivity / 100)) - wageNum;
    const productiveHours = netProductiveTime;

    onCalculate({
      interfaceName,
      experience,
      wage: wageNum,
      dailyHours: Number(dailyHours),
      isFullTime,
      isHoursMode,
      weeklyErrors: Number(weeklyErrors),
      annualErrors,
      distractionTimePerError,
      annualWorkHours,
      totalDistractionTime: totalDistractionHours,
      netProductiveTime,
      productivityLoss,
      maxAchievableProductivity,
      expectedAnnualHours,
      maxAchievableHours,
      errorImpactHours,
      trueLaborCost,
      productiveHours,
      employees: Number(employees),
      standardHoursPerDay,
      errorsPerUser,
      errorsPerDay: errorsPerUser / workingDays,
      dailyDistractionHours: distractionHoursPerUser / workingDays
    });
  };

  return (
    <div ref={formRef} className="card p-8">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Error Impact Calculator {formIndex + 1}</h2>
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
            title="Delete calculator"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <Switch.Group>
          <div className="flex items-center gap-2">
            <Switch.Label className="text-sm text-gray-600">
              {isHoursMode ? <Clock size={16} className="inline mr-1" /> : <DollarSign size={16} className="inline mr-1" />}
              {isHoursMode ? 'Hours Mode' : 'Value Mode'}
            </Switch.Label>
            <Switch
              checked={isHoursMode}
              onChange={setIsHoursMode}
              className={`${
                isHoursMode ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  isHoursMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </Switch.Group>

        <Switch.Group>
          <div className="flex items-center gap-2">
            <Switch.Label className="text-sm text-gray-600">
              <UserCheck size={16} className="inline mr-1" />
              {isFullTime ? 'Full-Time' : 'Part-Time'}
            </Switch.Label>
            <Switch
              checked={isFullTime}
              onChange={setIsFullTime}
              className={`${
                isFullTime ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  isFullTime ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </Switch.Group>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Tooltip content="Name of the interface or system being analyzed">
            Interface Name
          </Tooltip>
          <input
            type="text"
            maxLength={255}
            value={interfaceName}
            onChange={(e) => setInterfaceName(e.target.value)}
            className="input-field"
            placeholder="e.g., Sales Console"
          />
        </div>

        <div className="space-y-2">
          <Tooltip content="The experience level of employees using this interface">
            Employee Expertise Level
          </Tooltip>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value as 'Beginner' | 'Seasoned' | 'Expert')}
            className="select-field"
          >
            <option value="Beginner">Beginner</option>
            <option value="Seasoned">Seasoned</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        {!isHoursMode && (
          <div className="space-y-2">
            <Tooltip content="Annual salary based on standard 8-hour workday">
              Annual Wage (8hr basis)
            </Tooltip>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={wage}
              onChange={(e) => handleNumberInput(e.target.value, setWage)}
              className="input-field"
            />
          </div>
        )}

        <div className="space-y-2">
          <Tooltip content="Daily work hours for employees using this interface">
            Daily Work Hours
          </Tooltip>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={dailyHours}
            onChange={(e) => handleNumberInput(e.target.value, setDailyHours)}
            className="input-field"
          />
        </div>

        <div className="space-y-2">
          <Tooltip content="Number of employees affected by these errors">
            Number of Employees
          </Tooltip>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={employees}
            onChange={(e) => handleNumberInput(e.target.value, setEmployees)}
            className="input-field"
          />
        </div>

        <div className="space-y-2">
          <Tooltip content="Total weekly errors across all users">
            Weekly Errors (All Users)
          </Tooltip>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={weeklyErrors}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0 && value <= 100000) {
                handleNumberInput(e.target.value, setWeeklyErrors);
              }
            }}
            className="input-field"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="btn-primary mt-6"
      >
        Calculate Impact
      </button>
    </div>
  );
}