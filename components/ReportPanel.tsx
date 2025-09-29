import React from 'react';
import { StatusReport, OutputFormat } from '../types';
import StatusIndicator from './StatusIndicator';
import Loader from './Loader';

interface ReportPanelProps {
  report: StatusReport | null;
  isLoading: boolean;
  error: string | null;
  onGenerateReport: () => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  outputFormat: OutputFormat;
  setOutputFormat: (format: OutputFormat) => void;
}

const ReportPanel: React.FC<ReportPanelProps> = ({
  report,
  isLoading,
  error,
  onGenerateReport,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  outputFormat,
  setOutputFormat,
}) => {

  const commonButtonClasses = 'px-4 py-2 text-sm font-medium transition duration-150 ease-in-out focus:z-10 focus:outline-none focus:ring-2 focus:ring-brand-secondary';
  const activeButtonClasses = 'bg-brand-primary text-white border-brand-primary';
  const inactiveButtonClasses = 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600';
  const dateInputClasses = "w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary";


  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Generated Status Report</h2>
        <button
          onClick={onGenerateReport}
          disabled={isLoading}
          className="flex items-center bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          {isLoading ? 'Generating...' : 'Generate Report'}
        </button>
      </div>

      <div className="mb-6 p-4 bg-light-bg dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">Report Customization</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Start Date</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={dateInputClasses}
              aria-label="Report start date"
            />
          </div>
           <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">End Date</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={dateInputClasses}
              aria-label="Report end date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Output Format</label>
            <div className="flex rounded-md">
              <button
                type="button"
                onClick={() => setOutputFormat('bullet points')}
                className={`${commonButtonClasses} rounded-l-md ${outputFormat === 'bullet points' ? activeButtonClasses : inactiveButtonClasses}`}
              >
                Bullets
              </button>
              <button
                type="button"
                onClick={() => setOutputFormat('paragraphs')}
                className={`${commonButtonClasses} rounded-r-md -ml-px ${outputFormat === 'paragraphs' ? activeButtonClasses : inactiveButtonClasses}`}
              >
                Paragraphs
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative min-h-[300px]">
        {isLoading && <div className="absolute inset-0 flex justify-center items-center "><Loader /></div>}
        
        {error && <div className="text-status-red bg-red-100 dark:bg-red-900/50 p-4 rounded-lg">{error}</div>}

        {!report && !isLoading && !error && (
          <div className="text-center text-gray-500 dark:text-gray-400 pt-16">
            <p className="text-lg">Click "Generate Report" to create a project status summary.</p>
            <p className="mt-2 text-sm">The AI will analyze the live data to draft the report.</p>
          </div>
        )}

        {report && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-semibold text-brand-secondary mb-2">Project Health</h3>
              <StatusIndicator status={report.projectHealth} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-brand-secondary mb-2">Executive Summary</h3>
              <p className="text-gray-600 dark:text-gray-300 bg-light-bg dark:bg-dark-bg p-4 rounded-lg">{report.executiveSummary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-brand-secondary mb-2">Key Accomplishments</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 pl-2">
                  {report.keyAccomplishments.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brand-secondary mb-2">Roadblocks & Risks</h3>
                <ul className="list-disc list-inside space-y-2 text-status-red dark:text-red-400 pl-2">
                  {report.roadblocksAndRisks.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-brand-secondary mb-2">Detailed Task Progress</h3>
              <div className="space-y-2">
                  {report.detailedProgress.map((item) => (
                      <div key={item.taskId} className="p-3 bg-light-bg dark:bg-dark-bg rounded-lg">
                          <p className="font-bold">{item.taskId}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{item.update}</p>
                      </div>
                  ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPanel;