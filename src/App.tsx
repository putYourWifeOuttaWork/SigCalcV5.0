import React, { useState, useRef } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ErrorCalculatorForm } from './components/ErrorCalculatorForm';
import { ErrorResultsDisplay } from './components/ErrorResultsDisplay';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductivityChart } from './components/ProductivityChart';
import { CalculationResult, ErrorCalculationResult } from './types';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FileText, Download, FileDown, Zap, AlertTriangle } from 'lucide-react';
import { Tab } from '@headlessui/react';

export default function App() {
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [errorResults, setErrorResults] = useState<ErrorCalculationResult[]>([]);
  const [formCount, setFormCount] = useState(1);
  const [errorFormCount, setErrorFormCount] = useState(1);
  const [lastAddedForm, setLastAddedForm] = useState<number | null>(null);
  const [lastAddedErrorForm, setLastAddedErrorForm] = useState<number | null>(null);
  const citationsRef = useRef<HTMLDetailsElement>(null);
  const calculatorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const resultsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const errorCalculatorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const errorResultsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleCalculate = (result: CalculationResult, index: number) => {
    const newResults = [...results];
    newResults[index] = result;
    setResults(newResults);

    setTimeout(() => {
      if (resultsRefs.current[index]) {
        resultsRefs.current[index]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleErrorCalculate = (result: ErrorCalculationResult, index: number) => {
    const newResults = [...errorResults];
    newResults[index] = result;
    setErrorResults(newResults);

    setTimeout(() => {
      if (errorResultsRefs.current[index]) {
        errorResultsRefs.current[index]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleAddForm = () => {
    const newIndex = formCount;
    setFormCount(prev => prev + 1);
    setLastAddedForm(newIndex);
    
    setTimeout(() => {
      if (calculatorRefs.current[newIndex]) {
        calculatorRefs.current[newIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleAddErrorForm = () => {
    const newIndex = errorFormCount;
    setErrorFormCount(prev => prev + 1);
    setLastAddedErrorForm(newIndex);
    
    setTimeout(() => {
      if (errorCalculatorRefs.current[newIndex]) {
        errorCalculatorRefs.current[newIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleDeleteForm = (index: number) => {
    const newResults = [...results];
    newResults.splice(index, 1);
    setResults(newResults);
    setFormCount(prev => prev - 1);

    calculatorRefs.current = calculatorRefs.current.filter((_, i) => i !== index);
    resultsRefs.current = resultsRefs.current.filter((_, i) => i !== index);

    setTimeout(() => {
      const prevIndex = Math.max(0, index - 1);
      if (calculatorRefs.current[prevIndex]) {
        calculatorRefs.current[prevIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleDeleteErrorForm = (index: number) => {
    const newResults = [...errorResults];
    newResults.splice(index, 1);
    setErrorResults(newResults);
    setErrorFormCount(prev => prev - 1);

    errorCalculatorRefs.current = errorCalculatorRefs.current.filter((_, i) => i !== index);
    errorResultsRefs.current = errorResultsRefs.current.filter((_, i) => i !== index);

    setTimeout(() => {
      const prevIndex = Math.max(0, index - 1);
      if (errorCalculatorRefs.current[prevIndex]) {
        errorCalculatorRefs.current[prevIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleExportCSV = (isErrorTab: boolean = false) => {
    if (citationsRef.current) {
      citationsRef.current.open = true;
    }

    if (isErrorTab) {
      if (errorResults.length === 0) return;

      const headers = [
        'Interface', 'Experience', 'Annual Wage', 'Daily Hours', 'Weekly Errors',
        'Annual Errors', 'Errors per User', 'Distraction Time/Error',
        'Annual Work Hours', 'Total Distraction Time', 'Net Productive Time',
        'Productivity Loss %', 'Max Achievable %', 'True Labor Cost',
        'Enterprise Impact', 'Full Time'
      ];

      const csvContent = [
        headers.join(','),
        ...errorResults.map(r => [
          r.interfaceName || 'Unnamed',
          r.experience,
          r.wage,
          r.dailyHours,
          r.weeklyErrors,
          r.annualErrors,
          r.errorsPerUser.toFixed(2),
          r.distractionTimePerError,
          r.annualWorkHours,
          r.totalDistractionTime.toFixed(2),
          r.netProductiveTime.toFixed(2),
          r.productivityLoss.toFixed(2),
          r.maxAchievableProductivity.toFixed(2),
          r.trueLaborCost.toFixed(2),
          (r.trueLaborCost * r.employees).toFixed(2),
          r.isFullTime ? 'Yes' : 'No'
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'error_impact_analysis.csv';
      link.click();
    } else {
      if (results.length === 0) return;

      const headers = [
        'Role', 'Cost/Employee', 'Employees', 'Expected Tasks/Day',
        'Actual Tasks/Day', 'Productivity %', 'Value Produced',
        'Expected Value', 'True Cost', 'Total Role Value', 'Experience Level',
        'Hours Mode', 'Hours/Day', 'Hours Difference', 'Annual Hours Difference',
        'Full Time', 'Working Days/Year'
      ];

      const csvContent = [
        headers.join(','),
        ...results.map(r => [
          r.role,
          r.cost,
          r.employees,
          r.expectedTasks,
          r.tasksPerDay,
          r.productivity.toFixed(2),
          r.valueProduced.toFixed(2),
          r.expectedValue.toFixed(2),
          r.trueCost.toFixed(2),
          r.totalRoleValue.toFixed(2),
          r.experience,
          r.isHoursMode ? 'Yes' : 'No',
          r.hoursPerDay,
          r.hoursDifference?.toFixed(2),
          r.annualHoursDifference?.toFixed(2),
          r.isFullTime ? 'Yes' : 'No',
          r.workingDaysPerYear
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'productivity_analysis.csv';
      link.click();
    }
  };

  const handleExportPDF = () => {
    if (citationsRef.current) {
      citationsRef.current.open = true;
    }
    window.print();
  };

  const tabPanels = [
    {
      title: "Speed",
      icon: Zap,
      content: (
        <div className="space-y-6">
          <div className="flex gap-4 flex-wrap print:hidden">
            <button
              onClick={handleAddForm}
              className="btn-primary flex items-center gap-2"
            >
              <FileText size={20} />
              Add Role Calculation
            </button>
            
            {results.length > 0 && (
              <>
                <button
                  onClick={() => handleExportCSV(false)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Download size={20} />
                  Export to CSV
                </button>
                <button
                  onClick={handleExportPDF}
                  className="btn-primary flex items-center gap-2"
                >
                  <FileDown size={20} />
                  Export to PDF
                </button>
              </>
            )}
          </div>

          {Array.from({ length: formCount }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div ref={el => calculatorRefs.current[index] = el}>
                <ErrorBoundary>
                  <CalculatorForm 
                    onCalculate={(result) => handleCalculate(result, index)}
                    onDelete={index > 0 ? () => handleDeleteForm(index) : undefined}
                    formIndex={index}
                    autoScroll={index === lastAddedForm}
                    resultsRef={{ current: resultsRefs.current[index] }}
                    previousValues={index > 0 ? results[index - 1] : undefined}
                  />
                </ErrorBoundary>
              </div>
              <div ref={el => resultsRefs.current[index] = el}>
                {results[index] && (
                  <ErrorBoundary>
                    <ResultsDisplay 
                      result={results[index]} 
                      showChart={false} 
                      calculatorRef={{ current: calculatorRefs.current[index] }}
                    />
                  </ErrorBoundary>
                )}
              </div>
              
              {results[index] && index === formCount - 1 && (
                <div className="flex justify-center print:hidden">
                  <button
                    onClick={handleAddForm}
                    className="btn-primary flex items-center gap-2"
                  >
                    <FileText size={20} />
                    Add Role Calculation
                  </button>
                </div>
              )}
            </div>
          ))}

          {results.length > 0 && (
            <div className="card">
              <h3 className="text-xl font-semibold mb-6">Productivity Analysis Chart</h3>
              <div className="h-[600px]">
                <ErrorBoundary>
                  <ProductivityChart results={results} />
                </ErrorBoundary>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Errors",
      icon: AlertTriangle,
      content: (
        <div className="space-y-6">
          <div className="flex gap-4 flex-wrap print:hidden">
            <button
              onClick={handleAddErrorForm}
              className="btn-primary flex items-center gap-2"
            >
              <FileText size={20} />
              Add Error Calculator
            </button>

            {errorResults.length > 0 && (
              <>
                <button
                  onClick={() => handleExportCSV(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Download size={20} />
                  Export to CSV
                </button>
                <button
                  onClick={handleExportPDF}
                  className="btn-primary flex items-center gap-2"
                >
                  <FileDown size={20} />
                  Export to PDF
                </button>
              </>
            )}
          </div>

          {Array.from({ length: errorFormCount }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div ref={el => errorCalculatorRefs.current[index] = el}>
                <ErrorBoundary>
                  <ErrorCalculatorForm 
                    onCalculate={(result) => handleErrorCalculate(result, index)}
                    onDelete={index > 0 ? () => handleDeleteErrorForm(index) : undefined}
                    formIndex={index}
                    autoScroll={index === lastAddedErrorForm}
                    resultsRef={{ current: errorResultsRefs.current[index] }}
                    previousValues={index > 0 ? errorResults[index - 1] : undefined}
                  />
                </ErrorBoundary>
              </div>
              <div ref={el => errorResultsRefs.current[index] = el}>
                {errorResults[index] && (
                  <ErrorBoundary>
                    <ErrorResultsDisplay 
                      result={errorResults[index]}
                      calculatorRef={{ current: errorCalculatorRefs.current[index] }}
                    />
                  </ErrorBoundary>
                )}
              </div>
              
              {errorResults[index] && index === errorFormCount - 1 && (
                <div className="flex justify-center print:hidden">
                  <button
                    onClick={handleAddErrorForm}
                    className="btn-primary flex items-center gap-2"
                  >
                    <FileText size={20} />
                    Add Error Calculator
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 print:bg-white">
      <Header />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
              {tabPanels.map((tab, index) => (
                <Tab
                  key={tab.title}
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                    ${selected 
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-600'
                    } 
                    flex items-center justify-center gap-2 transition-all duration-200`
                  }
                >
                  {React.createElement(tab.icon, { size: 16 })}
                  {tab.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {tabPanels.map((tab, index) => (
                <Tab.Panel
                  key={index}
                  className={selectedTab === index ? 'block' : 'hidden'}
                >
                  {tab.content}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>

      <Footer citationsRef={citationsRef} />
    </div>
  );
}