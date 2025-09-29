
import { Task, ChatMessage, Milestone, TaskStatus } from '../types';

export const mockTasks: Task[] = [
  {
    id: 'T-01',
    title: 'Implement User Authentication Flow',
    status: TaskStatus.Completed,
    assignee: 'Alice',
    comments: ['Finished ahead of schedule. All tests passing.'],
  },
  {
    id: 'T-02',
    title: 'Design Dashboard UI/UX',
    status: TaskStatus.Completed,
    assignee: 'Bob',
    comments: ['Initial mockups approved by stakeholders.', 'Final designs delivered.'],
  },
  {
    id: 'T-03',
    title: 'Develop Reporting API Endpoint',
    status: TaskStatus.InProgress,
    assignee: 'Charlie',
    comments: ['Making good progress. Schema defined.', 'Encountering a minor issue with DB query optimization.'],
  },
  {
    id: 'T-04',
    title: 'Integrate with Third-Party Payment Gateway',
    status: TaskStatus.Blocked,
    assignee: 'Alice',
    comments: ["We are blocked. The payment gateway's sandbox environment is down. Their support has been notified, ETA for fix is 2 days."],
  },
  {
    id: 'T-05',
    title: 'Setup Staging Environment on AWS',
    status: TaskStatus.InProgress,
    assignee: 'David',
    comments: ['EC2 instance is up. Working on configuring the CI/CD pipeline.'],
  },
    {
    id: 'T-06',
    title: 'User Acceptance Testing (UAT)',
    status: TaskStatus.NotStarted,
    assignee: 'QA Team',
    comments: [],
  },
];

export const mockChatActivity: ChatMessage[] = [
  {
    user: 'Alice',
    message: "Hey team, just a heads-up, the payment gateway integration is blocked. Their sandbox is down.",
    timestamp: '2023-10-27 09:15 AM',
  },
  {
    user: 'Project Manager',
    message: "Thanks for the update, Alice. Please keep us posted on their response. This is a critical risk for the sprint.",
    timestamp: '2023-10-27 09:17 AM',
  },
  {
    user: 'Charlie',
    message: "The reporting endpoint is almost done, just need to optimize one of the queries. Shouldn't be a major delay.",
    timestamp: '2023-10-27 11:30 AM',
  },
  {
    user: 'Bob',
    message: "Great news! The stakeholders loved the final dashboard designs. No further revisions needed.",
    timestamp: '2023-10-26 03:45 PM',
  },
];

export const mockMilestones: Milestone[] = [
  {
    id: 'M-01',
    title: 'Alpha Release Candidate',
    status: 'Completed',
    dueDate: '2023-10-20',
  },
  {
    id: 'M-02',
    title: 'Beta Release to Internal Users',
    status: 'Upcoming',
    dueDate: '2023-11-05',
  },
  {
    id: 'M-03',
    title: 'Public Launch',
    status: 'Upcoming',
    dueDate: '2023-11-20',
  },
];
