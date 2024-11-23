export interface CalculationResult {
  role: string;
  cost: number;
  expectedTasks: number;
  tasksPerDay: number;
  maxClicksPerDay: number;
  productivity: number;
  valueProduced: number;
  expectedValue: number;
  trueCost: number;
  totalRoleValue: number;
  employees: number;
  experience: 'Beginner' | 'Seasoned' | 'Expert';
  isHoursMode?: boolean;
  hoursPerDay?: number;
  expectedHours?: number;
  hoursDifference?: number;
  annualHoursDifference?: number;
  isFullTime?: boolean;
  workingDaysPerYear?: number;
}

export interface ErrorCalculationResult {
  interfaceName: string;
  experience: 'Beginner' | 'Seasoned' | 'Expert';
  wage: number;
  dailyHours: number;
  isFullTime: boolean;
  isHoursMode: boolean;
  weeklyErrors: number;
  annualErrors: number;
  distractionTimePerError: number;
  annualWorkHours: number;
  totalDistractionTime: number;
  netProductiveTime: number;
  productivityLoss: number;
  maxAchievableProductivity: number;
  expectedAnnualHours: number;
  maxAchievableHours: number;
  errorImpactHours: number;
  trueLaborCost: number;
  productiveHours: number;
  employees: number;
  standardHoursPerDay: number;
  errorsPerUser: number;
  errorsPerDay: number;
  dailyDistractionHours: number;
}

export const DISTRACTION_MINUTES = {
  'Expert': 15,
  'Seasoned': 18,
  'Beginner': 23
};