import { CalculationResult } from '../types';

export function exportToCSV(results: CalculationResult[]) {
  const headers = [
    'Role',
    'Cost per Employee',
    'Number of Employees',
    'Expected Tasks',
    'Tasks per Day',
    'Max Clicks/Day',
    'Productivity %',
    'Value Produced',
    'Expected Value',
    'True Cost',
    'Total Role Value'
  ];

  const rows = results.map(result => [
    result.role,
    result.cost,
    result.employees,
    result.expectedTasks,
    result.tasksPerDay,
    result.maxClicksPerDay,
    `${result.productivity.toFixed(1)}%`,
    result.valueProduced.toFixed(2),
    result.expectedValue.toFixed(2),
    result.trueCost.toFixed(2),
    result.totalRoleValue.toFixed(2)
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'productivity-analysis.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}