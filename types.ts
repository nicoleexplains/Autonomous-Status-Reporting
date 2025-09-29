export enum TaskStatus {
  Completed = 'Completed',
  InProgress = 'In Progress',
  Blocked = 'Blocked',
  NotStarted = 'Not Started'
}

export enum TaskPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignee: string;
  priority: TaskPriority;
  comments: string[];
}

export interface ChatMessage {
  user: string;
  message: string;
  timestamp: string;
}

export interface Milestone {
  id: string;
  title: string;
  status: 'Completed' | 'Upcoming';
  dueDate: string;
}

export interface ProjectData {
  tasks: Task[];
  chatActivity: ChatMessage[];
  milestones: Milestone[];
}

export type OutputFormat = 'bullet points' | 'paragraphs';
export type ReportingPeriod = 'daily' | 'weekly';

export interface GenerateReportConfig extends ProjectData {
  startDate: string;
  endDate: string;
  outputFormat: OutputFormat;
  reportingPeriod: ReportingPeriod;
}

export enum HealthStatus {
    GREEN = 'GREEN',
    YELLOW = 'YELLOW',
    RED = 'RED'
}

export interface DetailedProgress {
    taskId: string;
    update: string;
}

export interface StatusReport {
  executiveSummary: string;
  projectHealth: HealthStatus;
  keyAccomplishments: string[];
  roadblocksAndRisks: string[];
  detailedProgress: DetailedProgress[];
}