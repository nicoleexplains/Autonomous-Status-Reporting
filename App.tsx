import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ProjectDataPanel from './components/ProjectDataPanel';
import ReportPanel from './components/ReportPanel';
import { mockTasks, mockChatActivity, mockMilestones } from './data/mockData';
import { StatusReport, OutputFormat, ReportingPeriod } from './types';
import { generateStatusReport } from './services/geminiService';

const getISODateString = (date: Date): string => date.toISOString().split('T')[0];

const App: React.FC = () => {
  const [report, setReport] = useState<StatusReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const [startDate, setStartDate] = useState<string>(getISODateString(sevenDaysAgo));
  const [endDate, setEndDate] = useState<string>(getISODateString(today));
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('bullet points');
  const [reportingPeriod, setReportingPeriod] = useState<ReportingPeriod>('weekly');

  const handleGenerateReport = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setReport(null);
    try {
      const generatedReport = await generateStatusReport({
        tasks: mockTasks,
        chatActivity: mockChatActivity,
        milestones: mockMilestones,
        startDate,
        endDate,
        outputFormat,
        reportingPeriod,
      });
      setReport(generatedReport);
    } catch (err) {
      console.error("Error generating report:", err);
      setError("Failed to generate the report. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate, outputFormat, reportingPeriod]);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProjectDataPanel 
            tasks={mockTasks} 
            chatActivity={mockChatActivity} 
            milestones={mockMilestones} 
          />
          <ReportPanel 
            report={report}
            isLoading={isLoading}
            error={error}
            onGenerateReport={handleGenerateReport}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            outputFormat={outputFormat}
            setOutputFormat={setOutputFormat}
            reportingPeriod={reportingPeriod}
            setReportingPeriod={setReportingPeriod}
          />
        </div>
      </main>
    </div>
  );
};

export default App;