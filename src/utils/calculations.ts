import { EmployeeRole, EPT_CLICKS_MAP, CalculationResult } from '../types';

const MINUTES_PER_DAY = 360; // 6 working hours

export function calculateProductivity(role: EmployeeRole) {
  const clicksPerMinute = EPT_CLICKS_MAP[role.ept as keyof typeof EPT_CLICKS_MAP];
  const maxClicksPerDay = clicksPerMinute * MINUTES_PER_DAY;
  const actualTasksPerDay = maxClicksPerDay / role.clicksPerTask;
  
  const expectedValue = role.costPerEmployee * 1.5; // 100% more than cost
  const productivityPercentage = (actualTasksPerDay / role.tasksPerDay) * 100;
  const valueProduced = (expectedValue * productivityPercentage) / 100;
  const trueLaborCost = valueProduced - expectedValue; // Changed to show difference from expected
  const totalRoleValue = trueLaborCost * role.numberOfEmployees; // Changed to use true labor cost

  return {
    id: role.id,
    role: role.role,
    costPerEmployee: role.costPerEmployee,
    expectedValue,
    maxClicksPerDay,
    actualTasksPerDay,
    tasksPerDay: role.tasksPerDay,
    productivityPercentage,
    valueProduced,
    trueLaborCost,
    numberOfEmployees: role.numberOfEmployees,
    totalRoleValue,
  };
}

export function exportToCSV(roles: EmployeeRole[], results: CalculationResult[]) {
  const headers = [
    'Role',
    'Cost Per Employee',
    'Tasks Per Day',
    'Clicks Per Task',
    'Number of Employees',
    'EPT',
    'Productivity %',
    'Value Produced',
    'True Labor Cost',
    'Total Role Value'
  ].join(',');

  const rows = results.map(result => [
    result.role,
    result.costPerEmployee,
    result.tasksPerDay,
    result.actualTasksPerDay,
    result.numberOfEmployees,
    roles.find(r => r.id === result.id)?.ept,
    result.productivityPercentage.toFixed(2),
    result.valueProduced.toFixed(2),
    result.trueLaborCost.toFixed(2),
    result.totalRoleValue.toFixed(2)
  ].join(','));

  const csv = [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'productivity_analysis.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}