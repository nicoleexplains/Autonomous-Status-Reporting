import React from 'react';
import { Task, ChatMessage, Milestone, TaskStatus, TaskPriority } from '../types';
import Card from './Card';

interface ProjectDataPanelProps {
  tasks: Task[];
  chatActivity: ChatMessage[];
  milestones: Milestone[];
}

const getStatusColor = (status: TaskStatus) => {
    switch(status) {
        case TaskStatus.Completed: return 'bg-green-500';
        case TaskStatus.InProgress: return 'bg-blue-500';
        case TaskStatus.Blocked: return 'bg-red-500';
        case TaskStatus.NotStarted: return 'bg-gray-400';
        default: return 'bg-gray-500';
    }
}

const getPriorityColor = (priority: TaskPriority) => {
    switch(priority) {
        case TaskPriority.High: return 'bg-red-500';
        case TaskPriority.Medium: return 'bg-yellow-500';
        case TaskPriority.Low: return 'bg-green-500';
        default: return 'bg-gray-500';
    }
}

const ProjectDataPanel: React.FC<ProjectDataPanelProps> = ({ tasks, chatActivity, milestones }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 border-b-2 border-brand-secondary pb-2">
        Live Project Data
      </h2>
      
      <Card title="Tasks">
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {tasks.map(task => (
            <div key={task.id} className="p-3 bg-light-bg dark:bg-dark-bg rounded-lg">
              <div className="flex justify-between items-start">
                <p className="font-semibold">{task.id}: {task.title}</p>
                <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
              <div className="flex items-center space-x-3 mt-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Assignee: {task.assignee}</p>
                 <span className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                </span>
              </div>
              {task.comments.length > 0 && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 border-l-2 border-gray-300 dark:border-gray-600 pl-2">
                  {task.comments.map((comment, index) => <p key={index}>"{comment}"</p>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card title="Recent Chat Activity">
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
          {chatActivity.map((chat, index) => (
            <div key={index} className="p-3 bg-light-bg dark:bg-dark-bg rounded-lg">
              <p className="font-semibold text-brand-secondary dark:text-blue-400">{chat.user}</p>
              <p className="text-sm">{chat.message}</p>
              <p className="text-xs text-right text-gray-400">{chat.timestamp}</p>
            </div>
          ))}
        </div>
      </Card>
      
      <Card title="Milestones">
        <div className="space-y-2">
          {milestones.map(milestone => (
            <div key={milestone.id} className="flex justify-between items-center p-2 bg-light-bg dark:bg-dark-bg rounded">
              <p>{milestone.title}</p>
              <span className={`text-sm font-medium ${milestone.status === 'Completed' ? 'text-status-green' : 'text-gray-500 dark:text-gray-400'}`}>
                {milestone.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProjectDataPanel;