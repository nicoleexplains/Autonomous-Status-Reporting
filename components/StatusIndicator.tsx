
import React from 'react';
import { HealthStatus } from '../types';

interface StatusIndicatorProps {
  status: HealthStatus;
}

const statusConfig = {
  [HealthStatus.GREEN]: {
    text: 'On Track',
    textColor: 'text-status-green',
    bgColor: 'bg-green-100 dark:bg-green-900/50',
    borderColor: 'border-status-green',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  },
  [HealthStatus.YELLOW]: {
    text: 'At Risk',
    textColor: 'text-status-yellow',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/50',
    borderColor: 'border-status-yellow',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
  },
  [HealthStatus.RED]: {
    text: 'Blocked',
    textColor: 'text-status-red',
    bgColor: 'bg-red-100 dark:bg-red-900/50',
    borderColor: 'border-status-red',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
  }
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const config = statusConfig[status];

  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 ${config.bgColor} ${config.borderColor}`}>
      <div className={config.textColor}>{config.icon}</div>
      <p className={`text-lg font-bold ${config.textColor}`}>{config.text}</p>
    </div>
  );
};

export default StatusIndicator;
