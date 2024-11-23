import React from 'react';
import { EmployeeRole, ROLE_DEFAULTS, EPT_CLICKS_MAP } from '../types';
import { X, Calculator } from 'lucide-react';

interface Props {
  role: EmployeeRole;
  onUpdate: (role: EmployeeRole) => void;
  onDelete: (id: string) => void;
  onCalculate: () => void;
}

export function RoleForm({ role, onUpdate, onDelete, onCalculate }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const updates: Partial<EmployeeRole> = { [name]: value };
    
    if (name === 'role') {
      const defaults = ROLE_DEFAULTS[value as keyof typeof ROLE_DEFAULTS];
      updates.tasksPerDay = defaults.tasksPerDay;
      updates.clicksPerTask = defaults.clicksPerTask;
    }

    onUpdate({
      ...role,
      ...updates,
      [name]: name === 'costPerEmployee' || name === 'numberOfEmployees' || name === 'ept' 
        ? Number(value) 
        : value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <button
        onClick={() => onDelete(role.id)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
      >
        <X size={20} />
      </button>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Employee Role</label>
          <select
            name="role"
            value={role.role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Service Agent">Service Agent</option>
            <option value="Sales Development Rep">Sales Development Rep</option>
            <option value="Account Executive">Account Executive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cost Per Employee</label>
          <input
            type="number"
            name="costPerEmployee"
            value={role.costPerEmployee}
            onChange={handleChange}
            min={35000}
            max={220000}
            step={5000}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tasks Per Day</label>
          <input
            type="number"
            name="tasksPerDay"
            value={role.tasksPerDay}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Clicks Per Task</label>
          <input
            type="number"
            name="clicksPerTask"
            value={role.clicksPerTask}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Employees</label>
          <input
            type="number"
            name="numberOfEmployees"
            value={role.numberOfEmployees}
            onChange={handleChange}
            min={1}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">EPT (seconds)</label>
          <select
            name="ept"
            value={role.ept}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {Object.keys(EPT_CLICKS_MAP).map((ept) => (
              <option key={ept} value={ept}>
                {ept}s
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onCalculate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Calculator size={20} />
          Calculate
        </button>
      </div>
    </div>
  );
}